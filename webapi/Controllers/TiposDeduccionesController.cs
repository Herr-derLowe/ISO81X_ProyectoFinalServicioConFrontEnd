using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiposDeduccionesController : ControllerBase
    {
        private readonly TiposDeduccionesService _tiposDeduccionesService;

        public TiposDeduccionesController(TiposDeduccionesService tiposDeduccionesService) =>
            _tiposDeduccionesService = tiposDeduccionesService;

        [HttpGet]
        [Route("GetTiposDeducciones")]
        public async Task<List<TiposDeducciones>> Get() =>
            await _tiposDeduccionesService.GetAsync();

        [HttpGet]
        [Route("GetTipoDeduccionById/{id:length(24)}")]
        public async Task<ActionResult<TiposDeducciones>> GetTipoDeduccionById(string id)
        {
            var tipoDeduccion = await _tiposDeduccionesService.GetAsync(id);

            if (tipoDeduccion is null)
            {
                return NotFound();
            }

            return tipoDeduccion;
        }

        [HttpPost]
        [Route("PostAddTipoDeduccion")]
        public async Task<IActionResult> Post(TiposDeducciones newTipoDeduccion)
        {
            await _tiposDeduccionesService.CreateAsync(newTipoDeduccion);

            return CreatedAtAction(nameof(Get), new { id = newTipoDeduccion.Id }, newTipoDeduccion);
        }


        [HttpPut]
        [Route("UpdateTipoDeduccion/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, TiposDeducciones updatedTipoDeduccion)
        {
            var tipoDeduccion = await _tiposDeduccionesService.GetAsync(id);

            if (tipoDeduccion is null)
            {
                return NotFound();
            }

            updatedTipoDeduccion.Id = tipoDeduccion.Id;

            await _tiposDeduccionesService.UpdateAsync(id, updatedTipoDeduccion);

            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteTipoDeduccion/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var tipoDeduccion = await _tiposDeduccionesService.GetAsync(id);

            if (tipoDeduccion is null)
            {
                return NotFound();
            }

            await _tiposDeduccionesService.RemoveAsync(id);

            return NoContent();
        }
    }
}
