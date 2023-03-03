using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class EmpleadosService
    {
        private readonly IMongoCollection<Empleados> _empleadosCollection;

        public EmpleadosService(
            IOptions<EmpleadosDatabaseSettings> empleadosDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                empleadosDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                empleadosDatabaseSettings.Value.DatabaseName);

            _empleadosCollection = mongoDatabase.GetCollection<Empleados>(
                empleadosDatabaseSettings.Value.EmpleadosCollectionName);
        }

        public async Task<List<Empleados>> GetAsync() =>
            await _empleadosCollection.Find(_ => true).ToListAsync();

        public async Task<Empleados?> GetAsync(string id) =>
            await _empleadosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Empleados newEmpleado) =>
            await _empleadosCollection.InsertOneAsync(newEmpleado);

        public async Task UpdateAsync(string id, Empleados updatedEmpleado) =>
            await _empleadosCollection.ReplaceOneAsync(x => x.Id == id, updatedEmpleado);

        public async Task RemoveAsync(string id) =>
            await _empleadosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
