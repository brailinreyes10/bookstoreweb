using BookStoreAPI.Dtos;
using BookStoreAPI.Repositories;
using BookStoreAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers.Sales
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleRepository _saleRepository;

        public SaleController (ISaleRepository saleRepository)
        {
            _saleRepository = saleRepository;
        }

        [HttpGet("GetSales")]
        public async Task<ActionResult> Get ()
        {
            try
            {
                var sales = _saleRepository.GetSalesAsync();

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Sales = sales }
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

        [HttpGet("GetSale/{id}")]
        public async Task<ActionResult> Get (int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest(
                   new
                   {
                       Message = "Invalid ID",
                   });

                var sale = _saleRepository.GetSaleByIdAsync(id);

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Sale = sale }
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

        [HttpGet("GetSaleDetails/{id}")]
        public async Task<ActionResult> GetSaleDetails (int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest(
                   new
                   {
                       Message = "Invalid ID",
                   });

                var saleDetails = _saleRepository.GetSaleDetailsBySaleIdAsync(id);

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { SaleDetails = saleDetails }
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

        [HttpPost("InsertSale")]
        public async Task<IActionResult> Post ([FromBody] SaleDto saleDto)
        {
            try
            {
                if (saleDto == null)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid sale data",
                        });
                }

                var saleId = await _saleRepository.InsertSaleAsync(saleDto);

                return Ok(
                    new
                    {
                        Message = "Sale successfully created.",
                        Data = new { SaleID = saleId }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid sale data"
                    });
            }
        }

        [HttpPut("UpdateSale/{id}")]
        public void Put (int id, [FromBody] string value)
        {
        }

        [HttpDelete("DeleteSale/{id}")]
        public void Delete (int id)
        {
        }
    }
}
