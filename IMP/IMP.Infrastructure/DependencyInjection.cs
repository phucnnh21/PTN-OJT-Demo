using Microsoft.Extensions.DependencyInjection;

namespace IMP.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureSevice(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}
