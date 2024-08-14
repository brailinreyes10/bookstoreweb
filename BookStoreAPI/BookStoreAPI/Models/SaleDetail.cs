using Microsoft.AspNetCore.Http.HttpResults;
using System.Net;

namespace BookStoreAPI.Models
{
    public class SaleDetail
    {
        public int SaleDetailID { get; set; }
        public int SaleID { get; set; }
        public int BookID { get; set; }
        public string BookName { get; set; }
        public string Author { get; set; }
        public decimal SalePrice { get; set; }
        public DateTime Create_dt { get; set; }
        public DateTime Update_dt { get; set; }

    }
}
