using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrador,Omnissiah")]
    public class TransaccionesController : ControllerBase
    {
        private readonly TransaccionesService _transaccionesService;

        public TransaccionesController(TransaccionesService transaccionesService) =>
            _transaccionesService = transaccionesService;

        [HttpGet]
        [Route("GetTransacciones")]
        public async Task<List<Transacciones>> Get() =>
            await _transaccionesService.GetAsync();

        [HttpGet]
        [Route("GetTransaccionesAsientoNull")]
        public async Task<List<Transacciones>> GetTransaccionesAsientoNull() =>
            await _transaccionesService.GetTransacAsntIdNullAsync();

        [HttpGet]
        [Route("GetTransacBetweenFechas")]
        public async Task<List<Transacciones>> GetTransacBetweenFechas(string datelow, string datehigh) =>
            await _transaccionesService.GetTransacBetweenFechas(DateTime.Parse(datelow), DateTime.Parse(datehigh));
        [HttpGet]
        [Route("GetTransacNullAsntBetweenFechas")]
        public async Task<List<Transacciones>> GetTransacNullAsntBetweenFechas(string datelow, string datehigh) =>
            await _transaccionesService.GetTransacNullBetweenFechas(DateTime.Parse(datelow), DateTime.Parse(datehigh));

        [HttpGet]
        [Route("GetTransaccionById/{id:length(24)}")]
        public async Task<ActionResult<Transacciones>> GetTransaccionById(string id)
        {
            var transaccion = await _transaccionesService.GetAsync(id);

            if (transaccion is null)
            {
                return NotFound();
            }

            return transaccion;
        }

        [HttpPost]
        [Route("PostAddTransaccion")]
        public async Task<IActionResult> Post(Transacciones newTransaccion)
        {
            if (ModelState.IsValid)
            {
                await _transaccionesService.CreateAsync(newTransaccion);

                return CreatedAtAction(nameof(Get), new { id = newTransaccion.Id }, newTransaccion);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }


        [HttpPut]
        [Route("UpdateTransaccion/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Transacciones updatedTransaccion)
        {
            var transaccion = await _transaccionesService.GetAsync(id);

            if (transaccion is null)
            {
                return NotFound();
            }

            updatedTransaccion.Id = transaccion.Id;

            await _transaccionesService.UpdateAsync(id, updatedTransaccion);

            return NoContent();
        }
        [HttpPut]
        [Route("UpdtTrasacNullIdBtwnFechas")]
        public async Task<IActionResult> UpdtTrasacNullIdBtwnFechas(string dateLower, string dateUpper, int idAsiento)
        {
            if (string.IsNullOrWhiteSpace(dateLower) || string.IsNullOrWhiteSpace(dateUpper)
                || !DateTime.TryParse(dateLower, out DateTime result) || !DateTime.TryParse(dateUpper, out DateTime result1))
            {
                return BadRequest("Una o ambas fechas no son validas");
            }
            
            await _transaccionesService.UpdtTrasacNullIdBtwnFechas(DateTime.Parse(dateLower), DateTime.Parse(dateUpper), idAsiento);

            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteTransaccion/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var transaccion = await _transaccionesService.GetAsync(id);

            if (transaccion is null)
            {
                return NotFound();
            }

            await _transaccionesService.RemoveAsync(id);

            return NoContent();
        }
    }
}
