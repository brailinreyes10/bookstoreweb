using BookStoreAPI.Models;

namespace BookStoreAPI.Dtos
{
    public class SaleDto
    {
        public int ClientID { get; set; }
        public List<SaleDetailDto> Details { get; set; }
    }
}