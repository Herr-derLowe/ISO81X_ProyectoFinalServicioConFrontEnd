﻿using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiposIngresosController : ControllerBase
    {
        private readonly TiposIngresosService _tiposIngresosService;

        public TiposIngresosController(TiposIngresosService tiposIngresosService) =>
            _tiposIngresosService = tiposIngresosService;

        [HttpGet]
        [Route("GetTiposIngresos")]
        public async Task<List<TiposIngresos>> Get() =>
            await _tiposIngresosService.GetAsync();

        [HttpGet]
        [Route("GetTipoIngresoById/{id:length(24)}")]
        public async Task<ActionResult<TiposIngresos>> GetTipoIngresoById(string id)
        {
            var tipoIngreso = await _tiposIngresosService.GetAsync(id);

            if (tipoIngreso is null)
            {
                return NotFound();
            }

            return tipoIngreso;
        }

        [HttpPost]
        [Route("PostAddTipoIngreso")]
        public async Task<IActionResult> Post(TiposIngresos newTipoIngreso)
        {
            await _tiposIngresosService.CreateAsync(newTipoIngreso);

            return CreatedAtAction(nameof(Get), new { id = newTipoIngreso.Id }, newTipoIngreso);
        }


        [HttpPut]
        [Route("UpdateTipoIngreso/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, TiposIngresos updatedTipoIngreso)
        {
            var tipoIngreso = await _tiposIngresosService.GetAsync(id);

            if (tipoIngreso is null)
            {
                return NotFound();
            }

            updatedTipoIngreso.Id = tipoIngreso.Id;

            await _tiposIngresosService.UpdateAsync(id, updatedTipoIngreso);

            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteTipoIngreso/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var tipoIngreso = await _tiposIngresosService.GetAsync(id);

            if (tipoIngreso is null)
            {
                return NotFound();
            }

            await _tiposIngresosService.RemoveAsync(id);

            return NoContent();
        }
    }
}
