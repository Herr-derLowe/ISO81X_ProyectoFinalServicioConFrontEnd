using webapi.Models;
using webapi.Services;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
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
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}