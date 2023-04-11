using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using webapi.Models;
using webapi.Models.ModelsForAuthentication;
using webapi.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              policy =>
                              {
                                  policy.AllowAnyOrigin();
                                  policy.AllowAnyMethod();
                                  policy.AllowAnyHeader();
                              });
        });
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JWT:Issuer"],
                ValidAudience = builder.Configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
                ClockSkew = TimeSpan.Zero
            };
        });

        builder.Services.Configure<UsuariosDatabaseSettings>(
            builder.Configuration.GetSection("UsuariosDatabase"));
        builder.Services.AddSingleton<UsuariosService>();

        builder.Services.Configure<EmpleadosDatabaseSettings>(
            builder.Configuration.GetSection("EmpleadosDatabase"));
        builder.Services.AddSingleton<EmpleadosService>();

        builder.Services.Configure<TiposIngresosDatabaseSettings>(
            builder.Configuration.GetSection("TiposIngresosDatabase"));
        builder.Services.AddSingleton<TiposIngresosService>();

        builder.Services.Configure<TiposDeduccionesDatabaseSettings>(
            builder.Configuration.GetSection("TiposDeduccionesDatabase"));
        builder.Services.AddSingleton<TiposDeduccionesService>();

        builder.Services.Configure<TransaccionesDatabaseSettings>(
            builder.Configuration.GetSection("TransaccionesDatabase"));
        builder.Services.AddSingleton<TransaccionesService>();

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        //builder.Services.AddSwaggerGen();
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }

        app.UseHttpsRedirection();

        app.UseCors(MyAllowSpecificOrigins);

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}