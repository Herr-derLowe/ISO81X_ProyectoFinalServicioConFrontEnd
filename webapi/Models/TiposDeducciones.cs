using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    public class TiposDeducciones
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRequired]
        public string claveDeduccion { get; set; }

        [BsonRequired]
        public string nombreDeduccion { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.Boolean)]
        public bool dependeSalarioD { get; set; }
        [BsonRequired]
        public string estadoDeduccion { get; set; }
    }
}
