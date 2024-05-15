namespace Infinity.Api.Models
{
    public class JWTAuth
    {
        public string Secret { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public string Subject { get; set; }
        public int ExpirationTimeMinutes { get; set; }
    }
}
