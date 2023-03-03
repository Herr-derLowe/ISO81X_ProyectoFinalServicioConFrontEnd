namespace webapi.Models
{
    public class TiposIngresosDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TiposIngresosCollectionName { get; set; } = null!;
    }
}
