using case2.Application.Common.DTOs;
using case2.Application.Common.Model;

namespace case2.Application.Common.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult?> SignInAsync(string email, string password);
        Task<AuthResult?> SignUpAsync(RegisterDTO registerDTO);
    }
}
