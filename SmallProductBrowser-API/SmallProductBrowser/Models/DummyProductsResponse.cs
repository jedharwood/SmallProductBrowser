﻿namespace SmallProductBrowser.Models
{
    public class DummyProductsResponse
    {
        public List<DummyProductResponse>? Products { get; set; }
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }
    }
}