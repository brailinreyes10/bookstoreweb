using BookStoreAPI.Dtos;
using BookStoreAPI.Models;
using BookStoreAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers.Books
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BookController (IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet("GetBooks")]
        public async Task<ActionResult> Get ()
        {
            try
            {
                var books = _bookRepository.GetBooksAsync();

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Books = books }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "An error occurred while processing the data"
                    });
            }
        }

        [HttpGet("GetBook/{id}")]
        public async Task<ActionResult> Get (int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest(
                   new
                   {
                       Message = "Invalid ID",
                   });
                }

                var book = _bookRepository.GetBookByIdAsync(id);

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Book = book }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "An error occurred while processing the data",
                    });
            }
        }

        [HttpPost("InsertBook")]
        public async Task<ActionResult> Post ([FromBody] BookDto bookDto)
        {
            try
            {
                if (bookDto == null)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid book data"
                        });
                }

                var bookId = await _bookRepository.InsertBookAsync(bookDto);

                return Ok(
                    new
                    {
                        Message = "Book successfully created.",
                        Data = new { BookId = bookId }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid Book data"
                    });
            }
        }

        [HttpPut("UpdateBook/{id}")]
        public async Task<ActionResult> Put (int id, [FromBody] Book book)
        {
            try
            {
                if (book == null)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid book data"
                        });
                }

                var result = await _bookRepository.UpdateBook(book);

                return Ok(
                    new
                    {
                        Message = "Book successfully updated.",
                        Data = new { result }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid book data"
                    });
            }
        }

        [HttpDelete("DeleteBook/{id}")]
        public async Task<ActionResult> Delete (int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid ID"
                        });
                }

                var result = await _bookRepository.DeleteBook(id);

                return Ok(
                    new
                    {
                        Message = "Book successfully deleted.",
                        Data = new { result }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid book data"
                    });
            }
        }
    }
}
