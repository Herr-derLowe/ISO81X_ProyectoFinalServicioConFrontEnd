namespace webapi.Models
{
    public class TiposDeduccionesDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TiposDeduccionesCollectionName { get; set; } = null!;
    }
}
