using SmallProductBrowser.Models;

namespace SmallProductBrowser.Services
{
    public class ProductsService(HttpClient httpClient) : IProductsService
    {
        private readonly HttpClient _httpClient = httpClient;
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
            var response = await _httpClient.GetAsync($"{_baseUrl}/{id}");
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                return null;

            return await response.Content.ReadFromJsonAsync<DummyProductResponse>();
        }
    }
}
