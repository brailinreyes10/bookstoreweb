using BookStoreAPI.Dtos;
using BookStoreAPI.Models;

namespace BookStoreAPI.Repositories.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetBooksAsync ();
        Task<Book> GetBookByIdAsync (int bookID);
        Task<int> InsertBookAsync (BookDto BookDto);

        Task<Book> UpdateBook (Book Book);
        Task<Book> DeleteBook (int id);
    }
}
