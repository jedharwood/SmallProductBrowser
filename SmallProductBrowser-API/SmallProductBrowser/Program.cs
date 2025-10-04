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

builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IProductsService, ProductsService>((sp, httpClient) =>
    new ProductsService(httpClient, sp.GetRequiredService<IMemoryCache>()));

var app = builder.Build();
app.UseHttpsRedirection();
app.MapProductsEndpoints();

app.Run();

