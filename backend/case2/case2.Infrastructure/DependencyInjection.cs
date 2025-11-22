using case2.Application.Common.Interfaces;
using case2.Application.Common.Interfaces.Repositories;
using case2.Infrastructure.Persistence;
using case2.Infrastructure.Persistence.Repositories;
using case2.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
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
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

            services.AddSingleton<SupabaseClientFactory>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IExperimentRepositories, ExperimentRepositories>();
            return services;
        }
    }
}


