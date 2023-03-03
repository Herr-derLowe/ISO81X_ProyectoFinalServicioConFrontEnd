using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController : ControllerBase
    {
        private readonly EmpleadosService _empleadosService;

        public EmpleadosController(EmpleadosService empleadosService) =>
            _empleadosService = empleadosService;

        [HttpGet]
        [Route("GetEmpleados")]
        public async Task<List<Empleados>> Get() =>
            await _empleadosService.GetAsync();

        [HttpGet]
        [Route("GetEmpleadoById/{id:length(24)}")]
        public async Task<ActionResult<Empleados>> GetEmpleadoById(string id)
        {
            var empleado = await _empleadosService.GetAsync(id);

            if (empleado is null)
            {
                return NotFound();
            }

            return empleado;
        }

        [HttpPost]
        [Route("PostAddEmpleado")]
        public async Task<IActionResult> Post(Empleados newEmpleado)
        {
            await _empleadosService.CreateAsync(newEmpleado);

            return CreatedAtAction(nameof(Get), new { id = newEmpleado.Id }, newEmpleado);
        }


        [HttpPut]
        [Route("UpdateEmpleado/{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Empleados updatedEmpleado)
        {
            var empleado = await _empleadosService.GetAsync(id);

            if (empleado is null)
            {
                return NotFound();
            }

            updatedEmpleado.Id = empleado.Id;

            await _empleadosService.UpdateAsync(id, updatedEmpleado);

            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteEmpleado/{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var empleado = await _empleadosService.GetAsync(id);

            if (empleado is null)
            {
                return NotFound();
            }

            await _empleadosService.RemoveAsync(id);

            return NoContent();
        }
    }
}
