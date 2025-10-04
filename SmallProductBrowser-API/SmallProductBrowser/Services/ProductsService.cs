using Microsoft.Extensions.Caching.Memory;
using SmallProductBrowser.Models;

namespace SmallProductBrowser.Services
{
    public class ProductsService(HttpClient httpClient, IMemoryCache memoryCache) : IProductsService
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly IMemoryCache _memoryCache = memoryCache;
        private readonly string _baseUrl = "https://dummyjson.com/products";

        public async Task<DummyProductsResponse> GetProductsAsync(string? search, int? page)
        {
            var pageSize = 10;
            var skip = ((page ?? 1) - 1) * pageSize;

            var url = !string.IsNullOrWhiteSpace(search)
                ? $"{_baseUrl}/search?q={Uri.EscapeDataString(search)}&limit={pageSize}&skip={skip}"
                : $"{_baseUrl}?limit={pageSize}&skip={skip}";

            return await _httpClient.GetFromJsonAsync<DummyProductsResponse>(url);
        }

        public async Task<DummyProductResponse?> GetProductByIdAsync(int id)
        {
            var cachedProduct = GetProductFromCache(id);
            if (cachedProduct != null)
                return cachedProduct;

            var response = await _httpClient.GetAsync($"{_baseUrl}/{id}");
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                return null;

            var result = await response.Content.ReadFromJsonAsync<DummyProductResponse>();

            if (result != null)
                SetProductInCache(id, result);

            return result;
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
        }
    }
}
