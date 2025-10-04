using Microsoft.Extensions.Caching.Memory;
using SmallProductBrowser.Endpoints;
using SmallProductBrowser.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<IProductsService, ProductsService>((sp, httpClient) =>
    new ProductsService(httpClient, sp.GetRequiredService<IMemoryCache>()));

var app = builder.Build();
app.UseHttpsRedirection();
app.MapProductsEndpoints();

app.Run();

