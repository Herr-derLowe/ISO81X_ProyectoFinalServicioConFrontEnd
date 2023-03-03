using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class TiposDeduccionesService
    {
        private readonly IMongoCollection<TiposDeducciones> _tiposDeduccionesCollection;

        public TiposDeduccionesService(
            IOptions<TiposDeduccionesDatabaseSettings> tiposDeduccionesDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                tiposDeduccionesDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                tiposDeduccionesDatabaseSettings.Value.DatabaseName);

            _tiposDeduccionesCollection = mongoDatabase.GetCollection<TiposDeducciones>(
                tiposDeduccionesDatabaseSettings.Value.TiposDeduccionesCollectionName);
        }

        public async Task<List<TiposDeducciones>> GetAsync() =>
            await _tiposDeduccionesCollection.Find(_ => true).ToListAsync();

        public async Task<TiposDeducciones?> GetAsync(string id) =>
            await _tiposDeduccionesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TiposDeducciones newTipoDeduccion) =>
            await _tiposDeduccionesCollection.InsertOneAsync(newTipoDeduccion);

        public async Task UpdateAsync(string id, TiposDeducciones updatedTipoDeduccion) =>
            await _tiposDeduccionesCollection.ReplaceOneAsync(x => x.Id == id, updatedTipoDeduccion);

        public async Task RemoveAsync(string id) =>
            await _tiposDeduccionesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
