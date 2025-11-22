using case2.Infrastructure.Persistence;
using case2.Application.Common.Interfaces;
using Supabase.Gotrue;
using Supabase;
using case2.Application.Common.Model;
using case2.Infrastructure.Persistence.Models;
using case2.Application.Common.DTOs;

namespace case2.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly SupabaseClientFactory _supabaseClientFactory;
        public AuthService(SupabaseClientFactory supabaseClientFactory)
        {
            _supabaseClientFactory = supabaseClientFactory;
        }

        public async Task<AuthResult?> SignInAsync(string email, string password)
        {
            var client = _supabaseClientFactory.Create();
            Session? session = await client.Auth.SignIn(email, password);
            return session is null ? null : MapSession(session);
        }

        public async Task<AuthResult?> SignUpAsync(RegisterDTO registerDTO)
        {
            var client = _supabaseClientFactory.Create();
            Session? session = await client.Auth.SignUp(registerDTO.Email, registerDTO.Password);
            if (session == null || session.User == null)
                return null;
            var user = new UserRecord
            {
                Id = session.User.Id!,
                Name = registerDTO.Name,
            };

            await client.From<UserRecord>().Insert(new List<UserRecord> { user });

            return MapSession(session);
        }

        private AuthResult MapSession(Session session)
        {
            return new AuthResult
            {
                AccessToken = session.AccessToken,
                RefreshToken = session.RefreshToken,
                UserId = session.User?.Id,
                Email = session.User?.Email
            };
        }
    }
}
