using BookStoreAPI.Dtos;
using BookStoreAPI.Models;

namespace BookStoreAPI.Repositories.Interfaces
{
    public interface ISaleRepository
    {
        Task<IEnumerable<Sale>> GetSalesAsync ();
        Task<Sale> GetSaleByIdAsync (int id);
        Task<IEnumerable<SaleDetail>> GetSaleDetailsBySaleIdAsync (int id);
        Task<int> InsertSaleAsync (SaleDto saleDto);

    }
}
