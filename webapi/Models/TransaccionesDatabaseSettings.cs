namespace webapi.Models
{
    public class TransaccionesDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TransaccionesCollectionName { get; set; } = null!;
    }
}
