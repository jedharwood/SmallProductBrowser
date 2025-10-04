using SmallProductBrowser.Services;

namespace SmallProductBrowser.Endpoints
{
    public static class ProductsEndpoints
    {
        public static void MapProductsEndpoints(this IEndpointRouteBuilder routes)
        {
            var group = routes.MapGroup("/api/products");

            group.MapGet("/", async (ILogger<Program> logger, IProductsService productsService, string? search, int? page) =>
            {
                logger.LogInformation($"{DateTime.Now}: GET /api/products/ called with query parameters: search=[{search}], page=[{page}]");
                var products = await productsService.GetProductsAsync(search, page);

                if (products == null) {
                    logger.LogInformation($"{DateTime.Now}: GET /api/products/ returned Not Found result");
                    return Results.NotFound();
                }

                logger.LogInformation($"{DateTime.Now}: GET /api/products/ returned: {products.Total} products");
                return Results.Ok(products);
            });

            group.MapGet("/{id:int}", async (ILogger<Program> logger, IProductsService productsService, int id) =>
            {
                logger.LogInformation($"{DateTime.Now}: GET /api/products/{id} called");
                var product = await productsService.GetProductByIdAsync(id);

                if (product == null)
                {
                    logger.LogInformation($"{DateTime.Now}: GET /api/products/{id} returned Not Found result");
                    return Results.NotFound();
                }

                logger.LogInformation($"{DateTime.Now}: GET /api/products/ returned product id:{product.Id}");
                return Results.Ok(product);
            });

        }
    }
}
