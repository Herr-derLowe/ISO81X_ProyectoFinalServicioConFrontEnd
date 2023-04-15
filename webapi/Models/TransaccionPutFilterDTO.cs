namespace webapi.Models
{
    public class TransaccionPutFilterDTO
    {
        public string dateLower { get; set; } = string.Empty;
        public string dateUpper { get; set; } = string.Empty;
        public int idAsiento { get; set; }
    }
}
