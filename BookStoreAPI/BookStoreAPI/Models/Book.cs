namespace BookStoreAPI.Models
{
    public class Book
    {
        public int BookID { get; set; }
        public string Title { get; set; }
        public int YearWritten { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public string PublishedDate { get; set; }
        public decimal Price { get; set; }
        public DateTime Create_dt { get; set; }
        public DateTime Update_dt { get; set; }
        public string StatusCode { get; set; }
    }
}
