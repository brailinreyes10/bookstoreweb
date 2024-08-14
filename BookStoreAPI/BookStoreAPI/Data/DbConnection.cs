using Microsoft.Data.SqlClient;
using System.Data;

namespace BookStoreAPI.Data
{
    public class DbConnection
    {
        private readonly string _connectionString;

        public DbConnection (IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IDbConnection CreateConnection ()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
