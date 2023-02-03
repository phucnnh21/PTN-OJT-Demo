using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace IMP.AppServices
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddAppSevice(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddScoped<IUserAppServices, UserAppServices>();
            services.AddScoped<IAuthAppServices, AuthAppServices>();

            return services;
        }
    }
}
