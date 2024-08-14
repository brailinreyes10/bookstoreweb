using BookStoreAPI.Models;

namespace BookStoreAPI.Dtos
{
    public class ClientDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdentificationNumber { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }
}
