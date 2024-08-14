using BookStoreAPI.Data;
using BookStoreAPI.Dtos;
using BookStoreAPI.Models;
using BookStoreAPI.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace BookStoreAPI.Repositories
{
    public class SaleRepository : ISaleRepository
    {
        private readonly DbConnection _dbConnection;

        public SaleRepository (DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Sale>> GetSalesAsync ()
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var sales = await connection.QueryAsync<Sale>(
                    "GetSales",
                    commandType: CommandType.StoredProcedure
                );

                return sales;
            }
        }

        public async Task<Sale> GetSaleByIdAsync (int id)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var parameters = new { SaleID = id };

                var sale = await connection.QueryFirstOrDefaultAsync<Sale>(
                    "GetSaleById",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return sale;
            }
        }

        public async Task<IEnumerable<SaleDetail>> GetSaleDetailsBySaleIdAsync (int id)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var parameters = new { SaleID = id };

                var saleDetails = await connection.QueryAsync<SaleDetail>(
                    "GetSaleDetails",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return saleDetails;
            }
        }

        public async Task<int> InsertSaleAsync (SaleDto saleDto)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClientID", saleDto.ClientID);
                parameters.Add("@SaleID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.ExecuteAsync(
                    "InsertSale",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                int saleID = parameters.Get<int>("@SaleID");

                await SaveSaleDetails(saleDto, connection, saleID);

                return saleID;
            }

        }

        private static async Task SaveSaleDetails (SaleDto saleDto, IDbConnection connection, int saleID)
        {
            foreach (var saleDetail in saleDto.Details)
            {
                var @params = new DynamicParameters();
                @params.Add("@SaleID", saleID);
                @params.Add("@BookID", saleDetail.BookID);
                @params.Add("@SalePrice", saleDetail.SalePrice);

                await connection.ExecuteAsync(
                    "InsertSaleDetail",
                    @params,
                    commandType: CommandType.StoredProcedure
                );
            }
        }
    }
}
