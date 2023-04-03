using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.IO;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using webapi.Models;
using webapi.Models.ModelsForAuthentication;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly UsuariosService _usuariosService;

        public AuthenticationController(UsuariosService usuariosService, IConfiguration configuration)
        {
            _usuariosService = usuariosService;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetUsuarios")]
        [Authorize(Roles = "Administrador,Omnissiah")]
        public async Task<List<User>> Get() =>
            await _usuariosService.GetAsync();

        [HttpGet]
        [Route("GetUsuarioById/{id:length(24)}")]
        [Authorize(Roles = "Administrador,Omnissiah")]
        public async Task<ActionResult<User>> GetUsuarioById(string id)
        {
            var usuario = await _usuariosService.GetAsync(id);

            if (usuario is null)
            {
                return NotFound();
            }

            return usuario;
        }

        [HttpPost]
        [Route("RegisterUsuario")]
        [Authorize(Roles = "Omnissiah")]
        public async Task<ActionResult<User>> Register(UserDTO registerData)
        {
            CreatePasswordHash(registerData.password, out byte[] passwordHash, out byte[] passwordSalt);

            User newUser = new User();
            newUser.username = registerData.username;
            newUser.role = registerData.role;
            newUser.passwordHash = passwordHash;
            newUser.passwordSalt = passwordSalt;

            await _usuariosService.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(UserLoginDTO loginData)
        {
            var usuario = await _usuariosService.GetUsernameAsync(loginData.username);

            if (usuario is null)
            {
                return NotFound();
            }
            if (!PasswordValidVerification(loginData.password, usuario.passwordHash, usuario.passwordSalt))
            {
                return BadRequest("Contrasena incorrecta");
            }

            var usuarioLoggedToken =
            new {
                username = loginData.username,
                role = usuario.role,
                token = CreateToken(usuario)
            };
            return Ok(usuarioLoggedToken);
        }

        [HttpGet]
        [Route("verifyjwt/{JWtoken}")]
        public bool VerifyJWT(string JWtoken)
        {
            var validationParameters = new TokenValidationParameters()
            {
                ValidIssuer = _configuration["JWT:Issuer"],
                ValidAudience = _configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration["JWT:Key"])),
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken validatedToken = null;
            try
            {
                tokenHandler.ValidateToken(JWtoken, validationParameters, out validatedToken);
            }
            catch (SecurityTokenException)
            {
                return false;
            }catch(Exception ex)
            {
                return false;
            }
            
            return validatedToken != null;
        }
        private string CreateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);
            List<Claim> claims = new List<Claim> { 
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.role),
            };

            var token = new JwtSecurityToken(_configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpDelete]
        [Route("DeleteUsuario/{id:length(24)}")]
        [Authorize(Roles = "Omnissiah")]
        public async Task<IActionResult> Delete(string id)
        {
            var usuario = await _usuariosService.GetAsync(id);

            if (usuario is null)
            {
                return NotFound();
            }

            await _usuariosService.RemoveAsync(id);

            return NoContent();
        }

        private void CreatePasswordHash(string passwordIN, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordIN));
            }
        }

        private bool PasswordValidVerification(string passwordIN, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordIN));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
