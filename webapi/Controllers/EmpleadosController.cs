using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using webapi.Models;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrador,Omnissiah")]
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
            if (!validaCedula(newEmpleado.cedulaEmpleado))
            {
                ModelState.AddModelError("cedulaEmpleado", "La cedula ingresada no es valida");
            }
            if (ModelState.IsValid)
            {
                await _empleadosService.CreateAsync(newEmpleado);

                return CreatedAtAction(nameof(Get), new { id = newEmpleado.Id }, newEmpleado);
            }
            else
            {
                return BadRequest(ModelState);
            }
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

            if (!validaCedula(updatedEmpleado.cedulaEmpleado))
            {
                ModelState.AddModelError("cedulaEmpleado", "La cedula ingresada no es valida");
            }

            if (ModelState.IsValid)
            {
                await _empleadosService.UpdateAsync(id, updatedEmpleado);

                return NoContent();
            }
            else
            {
                return BadRequest(ModelState);
            }
            
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

        public static bool validaCedula(string pCedula)

        {
            int vnTotal = 0;
            string vcCedula = pCedula.Replace("-", "");
            int pLongCed = vcCedula.Trim().Length;
            int[] digitoMult = new int[11] { 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1 };
            if (pLongCed < 11 || pLongCed > 11)
                return false;
            for (int vDig = 1; vDig <= pLongCed; vDig++)
            {
                int vCalculo = Int32.Parse(vcCedula.Substring(vDig - 1, 1)) * digitoMult[vDig - 1];
                if (vCalculo < 10)
                    vnTotal += vCalculo;
                else
                    vnTotal += Int32.Parse(vCalculo.ToString().Substring(0, 1)) + Int32.Parse(vCalculo.ToString().Substring(1, 1));
            }
            if (vnTotal % 10 == 0)
                return true;
            else
                return false;
        }
    }
}
