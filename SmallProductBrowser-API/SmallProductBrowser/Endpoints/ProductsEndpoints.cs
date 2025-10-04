using SmallProductBrowser.Models;

namespace SmallProductBrowser.Endpoints
{
    public static class ProductsEndpoints
    {
        public static void MapProductsEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/products");

            group.MapGet("/", async (HttpClient httpClient) =>
            {
                var products = await httpClient.GetFromJsonAsync<DummyProductsResponse>("https://dummyjson.com/products");

                return Results.Ok(products);
            });

            group.MapGet("/{id:int}", async (HttpClient httpClient, int id) =>
            {
                var product = await httpClient.GetFromJsonAsync<DummyProductResponse>($"https://dummyjson.com/products/{id}");

                if (product == null)
                    return Results.NotFound();

                return Results.Ok(product);
            });

        }
    }
}
