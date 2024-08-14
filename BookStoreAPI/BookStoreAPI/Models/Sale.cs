namespace BookStoreAPI.Models
{
    public class Sale
    {
        public int SaleID { get; set; }
        public int ClientID { get; set; }
        public string ClientName { get; set; }
        public string StatusCode { get; set; }
        public DateTime SaleDate { get; set; }
        public DateTime Create_dt { get; set; }
        public DateTime Update_dt { get; set; }
        public int CountBook { get; set; }
        public decimal Total { get; set; }
    }
}
