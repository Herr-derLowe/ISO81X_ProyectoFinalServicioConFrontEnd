using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.Diagnostics.Contracts;
using System.Dynamic;
using System.Globalization;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using webapi.Models;
using webapi.Services;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        public async Task<List<Transacciones>> GetTransacBetweenFechas(string datelow, string datehigh)
        {
            return await _transaccionesService.GetTransacBetweenFechas(DateTime.Parse(datelow), 
                DateTime.Parse(datehigh));
        }
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
        public async Task<IActionResult> UpdtTrasacNullIdBtwnFechas(TransaccionPutFilterDTO transacDTO)
        {
            CultureInfo culture = CultureInfo.InvariantCulture;
            DateTimeStyles dateTimeStyles = DateTimeStyles.AdjustToUniversal;
            //Console.WriteLine(transacDTO.dateLower);
            if (string.IsNullOrWhiteSpace(transacDTO.dateLower) || string.IsNullOrWhiteSpace(transacDTO.dateUpper)
                || !DateTime.TryParse(transacDTO.dateLower, out DateTime result) 
                || !DateTime.TryParse(transacDTO.dateUpper, out DateTime result1))
            {
                return BadRequest("Una o ambas fechas no son validas");
            }
            else if (transacDTO.idAsiento < 1)
            {
                return BadRequest("El id del asiento no puede ser menor que 1");
            }
            
            await _transaccionesService.UpdtTrasacNullIdBtwnFechas(DateTime.Parse(transacDTO.dateLower, culture, dateTimeStyles), 
                DateTime.Parse(transacDTO.dateUpper, culture, dateTimeStyles), 
                transacDTO.idAsiento);

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

        [HttpPost]
        [Route("postasiento")]
        public async Task<ContentResult> postasiento(AsientoDTO asientoDTO)
        {
            var myContent = JsonConvert.SerializeObject(asientoDTO);
            //Console.WriteLine(myContent);

            //var buffer = System.Text.Encoding.UTF8.GetBytes(myContent);
            //var byteContent = new ByteArrayContent(buffer);
            var httpContent = new StringContent(myContent, Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://contabilidadapi.azurewebsites.net");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsync("/api_aux/SistCont/", httpContent);
                
                var resultEND = new ContentResult { Content = response.Content.ReadAsStringAsync().Result, ContentType = "application/json" };
                return resultEND;
            }
        }
    }
}
