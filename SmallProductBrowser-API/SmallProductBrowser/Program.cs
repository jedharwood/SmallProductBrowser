using Microsoft.Extensions.Caching.Memory;
using SmallProductBrowser.Endpoints;
using SmallProductBrowser.Services;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .WriteTo.Console()
);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://localhost:5174")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IProductsService, ProductsService>((sp, httpClient) =>
    new ProductsService(
        httpClient,
        sp.GetRequiredService<IMemoryCache>(),
        sp.GetRequiredService<ILogger<ProductsService>>()
    ));

var app = builder.Build();
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.MapProductsEndpoints();
app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    logger.LogInformation("Request: {Method} {Path}", context.Request.Method, context.Request.Path);

    await next();

    logger.LogInformation("Response: {StatusCode}", context.Response.StatusCode);
});
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        logger.LogError(exceptionHandlerPathFeature?.Error, "Unhandled exception occurred");

        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("An unexpected error occurred.");
    });
});

app.Run();

