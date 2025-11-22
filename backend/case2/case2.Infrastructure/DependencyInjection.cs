using case2.Application.Common.Interfaces;
using case2.Infrastructure.Persistence;
using case2.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace case2.Infrastructure 
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddSingleton<SupabaseClientFactory>();
            services.AddScoped<IAuthService, AuthService>();
            return services;
        }
    }
}


