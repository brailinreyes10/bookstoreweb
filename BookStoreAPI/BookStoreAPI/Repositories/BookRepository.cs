using BookStoreAPI.Data;
using BookStoreAPI.Dtos;
using BookStoreAPI.Constants;
using BookStoreAPI.Models;
using BookStoreAPI.Repositories.Interfaces;
using Dapper;
using System.Data;

namespace BookStoreAPI.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly DbConnection _dbConnection;

        public BookRepository (DbConnection dbConnection)
        {
            _dbConnection = dbConnection;
        }

        public async Task<IEnumerable<Book>> GetBooksAsync ()
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var books = await connection.QueryAsync<Book>(
                    "GetBooks",
                    commandType: CommandType.StoredProcedure
                );

                return books;
            }
        }

        public async Task<Book> GetBookByIdAsync (int bookID)
        {
            using (var connection = _dbConnection.CreateConnection())
            {
                var parameters = new { BookID = bookID };

                var Book = await connection.QueryFirstOrDefaultAsync<Book>(
                    "GetBookById",
                    parameters,
                    commandType: CommandType.StoredProcedure);

                return Book;
            }
        }

        public async Task<int> InsertBookAsync (BookDto BookDto)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Title", BookDto.Title);
                parameters.Add("@YearWritten", BookDto.YearWritten);
                parameters.Add("@Author", BookDto.Author);
                parameters.Add("@Publisher", BookDto.Publisher);
                parameters.Add("@PublishedDate", BookDto.PublishedDate);
                parameters.Add("@Price", BookDto.Price);
                parameters.Add("@BookID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                await connection.ExecuteAsync(
                    "InsertBook",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return parameters.Get<int>("@BookID");
            }

        }

        public async Task<Book> UpdateBook (Book book)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@BookID", book.BookID);
                parameters.Add("@Title", book.Title);
                parameters.Add("@YearWritten", book.YearWritten);
                parameters.Add("@Author", book.Author);
                parameters.Add("@Publisher", book.Publisher);
                parameters.Add("@PublishedDate", book.PublishedDate);
                parameters.Add("@Price", book.Price);
                parameters.Add("@StatusCode", book.StatusCode);

                await connection.ExecuteAsync(
                    "UpdateBook",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return book;
            }
        }

        public async Task<Book> DeleteBook (int id)
        {
            using (IDbConnection connection = _dbConnection.CreateConnection())
            {
                var book = GetBookByIdAsync(id).Result;

                if (book != null)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@BookID", book.BookID);
                    parameters.Add("@Title", book.Title);
                    parameters.Add("@YearWritten", book.YearWritten);
                    parameters.Add("@Author", book.Author);
                    parameters.Add("@Publisher", book.Publisher);
                    parameters.Add("@PublishedDate", book.PublishedDate);
                    parameters.Add("@Price", book.Price);
                    parameters.Add("@StatusCode", Status.ACTIVE);

                    await connection.ExecuteAsync(
                        "UpdateBook",
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                }
                return book;
            }
        }
    }
}
