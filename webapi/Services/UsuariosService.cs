using Microsoft.Extensions.Options;
using MongoDB.Driver;
using webapi.Models.ModelsForAuthentication;

namespace webapi.Services
{
    public class UsuariosService
    {
        private readonly IMongoCollection<User> _usuariosCollection;

        public UsuariosService(
            IOptions<UsuariosDatabaseSettings> usuariosDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                usuariosDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                usuariosDatabaseSettings.Value.DatabaseName);

            _usuariosCollection = mongoDatabase.GetCollection<User>(
                usuariosDatabaseSettings.Value.UsuariosCollectionName);
        }

        public async Task<List<User>> GetAsync() =>
            await _usuariosCollection.Find(_ => true).ToListAsync();

        public async Task<User?> GetAsync(string id) =>
            await _usuariosCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task<User?> GetUsernameAsync(string username) =>
            await _usuariosCollection.Find(x => x.username == username).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _usuariosCollection.InsertOneAsync(newUser);

        //public async Task UpdateAsync(string id, Book updatedBook) =>
        //    await _usuariosCollection.ReplaceOneAsync(x => x.Id == id, updatedBook);

        public async Task RemoveAsync(string id) =>
            await _usuariosCollection.DeleteOneAsync(x => x.Id == id);
    }
}
