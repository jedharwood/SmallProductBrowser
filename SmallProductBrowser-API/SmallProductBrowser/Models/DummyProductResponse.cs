namespace SmallProductBrowser.Models
{
    public class DummyProductResponse
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public List<string>? Images { get; set; }
        public string? Thumbnail { get; set; }
    }
}
