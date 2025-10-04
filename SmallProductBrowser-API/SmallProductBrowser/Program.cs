using SmallProductBrowser.Endpoints;
using SmallProductBrowser.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient<IProductsService, ProductsService>();

var app = builder.Build();
app.UseHttpsRedirection();
app.MapProductsEndpoints();

app.Run();

