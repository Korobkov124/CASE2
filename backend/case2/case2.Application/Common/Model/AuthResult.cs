
namespace case2.Application.Common.Model
{
    public class AuthResult
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? UserId { get; set; }
        public string? Email { get; set; }
    }
}
