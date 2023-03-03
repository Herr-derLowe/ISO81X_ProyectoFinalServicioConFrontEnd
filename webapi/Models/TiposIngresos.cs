using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    public class TiposIngresos
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRequired]
        public string claveIngreso { get; set; }

        [BsonRequired]
        public string nombreIngreso { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.Boolean)]
        public bool dependeSalarioI { get; set; }
        [BsonRequired]
        public string estadoIngreso { get; set; }
    }
}
