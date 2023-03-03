namespace webapi.Models
{
    public class EmpleadosDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string EmpleadosCollectionName { get; set; } = null!;
    }
}
