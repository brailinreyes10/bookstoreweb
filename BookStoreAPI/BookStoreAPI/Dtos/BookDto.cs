namespace BookStoreAPI.Dtos
{
    public class BookDto
    {
        public string Title { get; set; }
        public int YearWritten { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public DateTime PublishedDate { get; set; }
        public decimal Price { get; set; }
    }
}
