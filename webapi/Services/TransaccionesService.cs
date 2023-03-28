using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models;

namespace webapi.Services
{
    public class TransaccionesService
    {
        private readonly IMongoCollection<Transacciones> _transaccionesCollection;

        public TransaccionesService(
            IOptions<TransaccionesDatabaseSettings> transaccionesDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                transaccionesDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                transaccionesDatabaseSettings.Value.DatabaseName);

            _transaccionesCollection = mongoDatabase.GetCollection<Transacciones>(
                transaccionesDatabaseSettings.Value.TransaccionesCollectionName);
        }

        public async Task<List<Transacciones>> GetAsync() =>
            await _transaccionesCollection.Find(_ => true).ToListAsync();

        public async Task<Transacciones?> GetAsync(string id) =>
            await _transaccionesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        public async Task<List<Transacciones>> GetTransacAsntIdNullAsync() =>
            await _transaccionesCollection.Find(x => x.idAsiento == null).ToListAsync();
        public async Task<List<Transacciones>> GetTransacBetweenFechas(DateTime dateLower, DateTime dateUpper)
        {
            var filterBuilder = Builders<Transacciones>.Filter;
            var filter = filterBuilder.Gte(x => x.fechaTransaccion, dateLower) &
                filterBuilder.Lte(x => x.fechaTransaccion, dateUpper);

           return await _transaccionesCollection.Find(filter).ToListAsync();
        }
        public async Task<List<Transacciones>> GetTransacNullBetweenFechas(DateTime dateLower, DateTime dateUpper)
        {
            var filterBuilder = Builders<Transacciones>.Filter;
            var filter = filterBuilder.Gte(x => x.fechaTransaccion, dateLower) &
                filterBuilder.Lte(x => x.fechaTransaccion, dateUpper) &
                filterBuilder.Eq(x => x.idAsiento, null);

            return await _transaccionesCollection.Find(filter).ToListAsync();
        }

        public async Task CreateAsync(Transacciones newTransaccion) =>
            await _transaccionesCollection.InsertOneAsync(newTransaccion);

        public async Task UpdateAsync(string id, Transacciones updatedTransaccion) =>
            await _transaccionesCollection.ReplaceOneAsync(x => x.Id == id, updatedTransaccion);

        public async Task UpdtTrasacNullIdBtwnFechas(DateTime dateLower, DateTime dateUpper, int idAsiento)
        {
            UpdateDefinition<Transacciones> updatedTransaccion = Builders<Transacciones>.Update.Set(x => x.idAsiento, idAsiento);

            var filterBuilder = Builders<Transacciones>.Filter;
            var filter = filterBuilder.Gte(x => x.fechaTransaccion, dateLower) &
                filterBuilder.Lte(x => x.fechaTransaccion, dateUpper) &
                filterBuilder.Eq(x=>x.idAsiento, null);

            await _transaccionesCollection.UpdateManyAsync(filter, updatedTransaccion);
        }

        public async Task RemoveAsync(string id) =>
            await _transaccionesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
