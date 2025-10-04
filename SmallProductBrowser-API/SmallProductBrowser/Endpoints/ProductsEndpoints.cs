using SmallProductBrowser.Services;

namespace SmallProductBrowser.Endpoints
{
    public static class ProductsEndpoints
    {
        public static void MapProductsEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/products");

            group.MapGet("/", async (IProductsService productsService, string? search, int? page) =>
            {
                var products = await productsService.GetProductsAsync(search, page);

                if (products == null) return Results.NotFound();
               
                return Results.Ok(products);
            });

            group.MapGet("/{id:int}", async (IProductsService productsService, int id) =>
            {
                var product = await productsService.GetProductByIdAsync(id);

                if (product == null) return Results.NotFound();

                return Results.Ok(product);
            });

        }
    }
}
