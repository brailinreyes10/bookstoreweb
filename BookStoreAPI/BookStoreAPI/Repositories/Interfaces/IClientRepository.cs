using BookStoreAPI.Dtos;
using BookStoreAPI.Models;

namespace BookStoreAPI.Repositories.Interfaces
{
    public interface IClientRepository
    {
        Task<IEnumerable<Client>> GetClientsAsync ();
        Task<Client> GetClientByIdAsync (int id);
        Task<int> InsertClientAsync (ClientDto clientDto);

        Task<Client> UpdateClient (Client client);
        Task<Client> DeleteClient (int id);
    }
}
