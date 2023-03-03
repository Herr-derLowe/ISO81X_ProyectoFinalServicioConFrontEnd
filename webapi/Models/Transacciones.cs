using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    public class Transacciones
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string empleado_id { get; set; }
        [BsonRequired]
        public string tipoTransaccion { get; set; }

        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ingresoDeduccion_id { get; set; }
        [BsonRequired]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local, Representation = BsonType.String)]
        public DateTime fechaTransaccion { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.Double)]
        public double montoTransaccion { get; set; }

        [BsonRequired]
        public string estadoTransaccion { get; set; }
    }
}
