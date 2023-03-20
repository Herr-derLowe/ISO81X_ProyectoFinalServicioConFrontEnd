using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
