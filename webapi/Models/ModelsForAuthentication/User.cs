using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace webapi.Models.ModelsForAuthentication
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonRequired]
        public string username { get; set; }=string.Empty;

        [BsonRequired]
        [BsonRepresentation(BsonType.String)]
        public byte[] passwordHash { get; set; } = null!;
        [BsonRequired]
        [BsonRepresentation(BsonType.String)]
        public byte[] passwordSalt { get; set; } = null!;
        [BsonRequired]
        public string role { get; set; } = string.Empty;
    }
}
