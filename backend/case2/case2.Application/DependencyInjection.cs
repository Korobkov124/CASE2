using case2.Application.Interface;
using case2.Application.Services;
using case2.Domain;
using Microsoft.Extensions.DependencyInjection;

namespace case2.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IGraphicService, GraphicService>();
            services.AddScoped<IExperimentService, ExperimentService>();
            services.AddSingleton<Calculating>();
            return services;
        }
    }
}
