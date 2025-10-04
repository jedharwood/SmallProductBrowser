using SmallProductBrowser.Models;

namespace SmallProductBrowser.Services
{
    public interface IProductsService
    {
        Task<DummyProductsResponse> GetProductsAsync(string? search, int? page);
        Task<DummyProductResponse?> GetProductByIdAsync(int id);
    }
}
