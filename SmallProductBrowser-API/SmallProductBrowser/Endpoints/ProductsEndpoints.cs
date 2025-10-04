using SmallProductBrowser.Models;

namespace SmallProductBrowser.Endpoints
{
    public static class ProductsEndpoints
    {
        public static void MapProductsEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/products");

            group.MapGet("/", async (HttpClient httpClient, string? search, int? page) =>
            {
                var pageSize = 10;
                var skip = ((page ?? 1) - 1) * pageSize;

                string url;
                if (!string.IsNullOrWhiteSpace(search))
                {
                    url = $"https://dummyjson.com/products/search?q={Uri.EscapeDataString(search)}&limit={pageSize}&skip={skip}";
                }
                else
                {
                    url = $"https://dummyjson.com/products?limit={pageSize}&skip={skip}";
                }

                var products = await httpClient.GetFromJsonAsync<DummyProductsResponse>(url);

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
