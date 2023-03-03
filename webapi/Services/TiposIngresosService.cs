using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class TiposIngresosService
    {
        private readonly IMongoCollection<TiposIngresos> _tiposIngresosCollection;

        public TiposIngresosService(
            IOptions<TiposIngresosDatabaseSettings> tiposIngresosDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                tiposIngresosDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                tiposIngresosDatabaseSettings.Value.DatabaseName);

            _tiposIngresosCollection = mongoDatabase.GetCollection<TiposIngresos>(
                tiposIngresosDatabaseSettings.Value.TiposIngresosCollectionName);
        }

        public async Task<List<TiposIngresos>> GetAsync() =>
            await _tiposIngresosCollection.Find(_ => true).ToListAsync();

        public async Task<TiposIngresos?> GetAsync(string id) =>
            await _tiposIngresosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TiposIngresos newTipoIngreso) =>
            await _tiposIngresosCollection.InsertOneAsync(newTipoIngreso);

        public async Task UpdateAsync(string id, TiposIngresos updatedTipoIngreso) =>
            await _tiposIngresosCollection.ReplaceOneAsync(x => x.Id == id, updatedTipoIngreso);

        public async Task RemoveAsync(string id) =>
            await _tiposIngresosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
