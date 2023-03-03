using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace webapi.Models
{
    public class Empleados
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonRequired]
        public string cedulaEmpleado { get; set; }

        [BsonRequired]
        public string nombreEmpleado { get; set; }

        public string? departamento { get; set; }
        public string? puestoEmpleado { get; set; }
        [BsonRequired]
        [BsonRepresentation(BsonType.Double)]
        public double salarioMensual { get; set; }

        [BsonRequired]
        [BsonRepresentation(BsonType.Int32)]
        public int identificadorNomina { get; set; }
    }
}
