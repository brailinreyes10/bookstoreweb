using BookStoreAPI.Dtos;
using BookStoreAPI.Models;
using BookStoreAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreAPI.Controllers.Clients
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _clientRepository;

        public ClientController (IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        [HttpGet("GetClients")]
        public async Task<ActionResult> Get ()
        {
            try
            {
                var clients = _clientRepository.GetClientsAsync();

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Clients = clients }
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

        [HttpGet("GetClient/{id}")]
        public async Task<IActionResult> Get (int id)
        {
            try
            {
                if (id == 0)
                    return BadRequest(
                   new
                   {
                       Message = "Invalid ID",
                   });

                var client = _clientRepository.GetClientByIdAsync(id);

                return Ok(
                    new
                    {
                        Message = "Success",
                        Data = new { Client = client }
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

        [HttpPost("InsertClient")]
        public async Task<IActionResult> Post ([FromBody] ClientDto clientDto)
        {
            try
            {
                if (clientDto == null)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid client data",
                        });
                }

                var clientId = await _clientRepository.InsertClientAsync(clientDto);

                return Ok(
                    new
                    {
                        Message = "Client successfully created.",
                        Data = new { ClientID = clientId }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid client data"
                    });
            }
        }

        [HttpPut("UpdateClient/{id}")]
        public async Task<IActionResult> Put (int id, [FromBody] Client client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest(
                        new
                        {
                            Message = "Invalid client data"
                        });
                }

                var result = await _clientRepository.UpdateClient(client);

                return Ok(
                    new
                    {
                        Message = "Client successfully updated.",
                        Data = new { result }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid client data"
                    });
            }
        }

        [HttpDelete("DeleteClient/{id}")]
        public async Task<IActionResult> Delete (int id)
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

                var result = await _clientRepository.DeleteClient(id);

                return Ok(
                    new
                    {
                        Message = "Client successfully deleted.",
                        Data = new { result }
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(
                    new
                    {
                        Message = "Invalid client data",
                    });
            }
        }
    }
}
