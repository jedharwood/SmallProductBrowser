using Microsoft.Extensions.Caching.Memory;
using SmallProductBrowser.Models;

namespace SmallProductBrowser.Services
{
    public class ProductsService(HttpClient httpClient, IMemoryCache memoryCache, ILogger<ProductsService> logger) : IProductsService
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly IMemoryCache _memoryCache = memoryCache;
        private readonly ILogger<ProductsService> _logger = logger;
        private readonly string _baseUrl = "https://dummyjson.com/products";

        public async Task<DummyProductsResponse> GetProductsAsync(string? search, int? page)
        {
            var pageSize = 10;
            var skip = ((page ?? 1) - 1) * pageSize;

            var url = !string.IsNullOrWhiteSpace(search)
                ? $"{_baseUrl}/search?q={Uri.EscapeDataString(search)}&limit={pageSize}&skip={skip}"
                : $"{_baseUrl}?limit={pageSize}&skip={skip}";

            try
            {
                var result = await _httpClient.GetFromJsonAsync<DummyProductsResponse>(url);
                return result!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching products from {url}");
                throw;
            }
        }

        public async Task<DummyProductResponse?> GetProductByIdAsync(int id)
        {
            var cachedProduct = GetProductFromCache(id);
            if (cachedProduct != null)
            {
                _logger.LogInformation($"Product: {id} found in cache");
                return cachedProduct;
            }

            var url = $"{_baseUrl}/{id}";
            try
            {
                var response = await _httpClient.GetAsync(url);
                if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return null;
                }

                var result = await response.Content.ReadFromJsonAsync<DummyProductResponse>();

                if (result != null)
                {
                    SetProductInCache(id, result);
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching product: {id} from {url}");
                throw;
            }
        }

        private string GetProductCacheKey(int id) => $"Product_{id}";

        private DummyProductResponse? GetProductFromCache(int id)
        {
            _memoryCache.TryGetValue(GetProductCacheKey(id), out DummyProductResponse? cachedProduct);
            return cachedProduct;
        }

        private void SetProductInCache(int id, DummyProductResponse product)
        {
            _memoryCache.Set(GetProductCacheKey(id), product, TimeSpan.FromMinutes(1));
            _logger.LogInformation($"Product: {id} cached.");
        }
    }
}
