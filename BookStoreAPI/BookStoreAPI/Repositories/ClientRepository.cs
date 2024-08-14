using BookStoreAPI.Constants;
using BookStoreAPI.Data;
using BookStoreAPI.Dtos;
using BookStoreAPI.Models;
using BookStoreAPI.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace BookStoreAPI.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly DbConnection _dbConnection;

        public ClientRepository (DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync ()
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var clients = await connection.QueryAsync<Client>(
                    "GetClients",
                    commandType: CommandType.StoredProcedure
                );

                return clients;
            }
        }

        public async Task<Client> GetClientByIdAsync (int clientID)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var parameters = new { ClientID = clientID };

                var client = await connection.QueryFirstOrDefaultAsync<Client>(
                    "GetClientById",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return client;
            }
        }

        public async Task<int> InsertClientAsync (ClientDto clientDto)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@FirstName", clientDto.FirstName);
                parameters.Add("@LastName", clientDto.LastName);
                parameters.Add("@IdentificationNumber", clientDto.IdentificationNumber);
                parameters.Add("@Phone", clientDto.Phone);
                parameters.Add("@Address", clientDto.Address);
                parameters.Add("@ClientID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.ExecuteAsync(
                    "InsertClient",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return parameters.Get<int>("@ClientID");
            }

        }

        public async Task<Client> UpdateClient (Client client)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@ClientID", client.ClientID);
                parameters.Add("@FirstName", client.FirstName);
                parameters.Add("@LastName", client.LastName);
                parameters.Add("@IdentificationNumber", client.IdentificationNumber);
                parameters.Add("@Phone", client.Phone);
                parameters.Add("@Address", client.Address);
                parameters.Add("@StatusCode", client.StatusCode);

                await connection.ExecuteAsync(
                    "UpdateClient",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return client;
            }
        }

        public async Task<Client> DeleteClient (int id)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var client = GetClientByIdAsync(id).Result;

                if (client != null)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@ClientID", client.ClientID);
                    parameters.Add("@FirstName", client.FirstName);
                    parameters.Add("@LastName", client.LastName);
                    parameters.Add("@IdentificationNumber", client.IdentificationNumber);
                    parameters.Add("@Phone", client.Phone);
                    parameters.Add("@Address", client.Address);
                    parameters.Add("@StatusCode", Status.DELETED);

                    await connection.ExecuteAsync(
                        "UpdateClient",
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                }
                return client;
            }
        }
    }
}
