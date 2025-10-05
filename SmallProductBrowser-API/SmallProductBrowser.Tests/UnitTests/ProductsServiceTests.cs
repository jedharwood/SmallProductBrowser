using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Moq;
using Moq.Protected;
using SmallProductBrowser.Models;
using SmallProductBrowser.Services;
using System.Net;
using System.Net.Http.Json;

namespace SmallProductBrowser.Tests.UnitTests
{
    public class ProductsServiceTests
    {
        private Mock<HttpMessageHandler> _mockHandler = null!;
        private HttpClient _httpClient = null!;
        private ProductsService _service = null!;
        private MemoryCache _memoryCache = null!;
        private Mock<ILogger<ProductsService>> _mockLogger = null!;


        private void SetupHttpResponse(HttpResponseMessage response)
        {
            _mockHandler = new Mock<HttpMessageHandler>();
            _mockHandler.Protected()
                .Setup<Task<HttpResponseMessage>>(
                    "SendAsync",
                    ItExpr.IsAny<HttpRequestMessage>(),
                    ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(response);

            _httpClient = new HttpClient(_mockHandler.Object);
            _memoryCache = new MemoryCache(new MemoryCacheOptions());
            _mockLogger = new Mock<ILogger<ProductsService>>();
            _service = new ProductsService(_httpClient, _memoryCache, _mockLogger.Object);
        }

        [Fact]
        public async Task GetProductByIdAsync_ReturnsProduct_WhenFound()
        {
            // Arrange
            var expectedProduct = new DummyProductResponse { Id = 1, Title = "Product 1" };
            SetupHttpResponse(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = JsonContent.Create(expectedProduct)
            });

            // Act
            var result = await _service.GetProductByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedProduct.Id, result.Id);
            Assert.Equal(expectedProduct.Title, result.Title);
        }

        [Fact]
        public async Task GetProductByIdAsync_ReturnsNull_WhenNotFound()
        {
            // Arrange
            SetupHttpResponse(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.NotFound
            });

            // Act
            var result = await _service.GetProductByIdAsync(999);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetProductsAsync_ReturnsProducts_WhenFound()
        {
            // Arrange
            var expectedProducts = new DummyProductsResponse
            {
                Products = new List<DummyProductResponse>
                {
                    new DummyProductResponse { Id = 1, Title = "Product 1" },
                    new DummyProductResponse { Id = 2, Title = "Product 2" }
                },
                Total = 2,
            };
            SetupHttpResponse(new HttpResponseMessage
            {
                StatusCode = HttpStatusCode.OK,
                Content = JsonContent.Create(expectedProducts)
            });

            // Act
            var result = await _service.GetProductsAsync(null, null);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedProducts.Total, result.Total);
            Assert.Equal(expectedProducts.Products.Count, result.Products!.Count);
            Assert.Equal(expectedProducts.Products[0].Id, result.Products[0].Id);
            Assert.Equal(expectedProducts.Products[0].Title, result.Products[0].Title);
        }
    }
}