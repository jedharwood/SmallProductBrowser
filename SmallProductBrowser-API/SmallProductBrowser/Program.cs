using SmallProductBrowser.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();

var app = builder.Build();
app.UseHttpsRedirection();
app.MapProductsEndpoints();

app.Run();

