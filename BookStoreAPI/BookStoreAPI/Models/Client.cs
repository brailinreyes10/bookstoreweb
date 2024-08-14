namespace BookStoreAPI.Models
{
    public class Client
    {
        public int ClientID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public string IdentificationNumber { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public DateTime Create_dt { get; set; }
        public DateTime Update_dt { get; set; }
        public string StatusCode { get; set; }
    }
}
