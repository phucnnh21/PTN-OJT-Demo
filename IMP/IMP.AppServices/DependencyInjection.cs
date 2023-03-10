using IMP.EFCore;
using IMP.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace IMP.AppServices
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddAppSevice(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddScoped<IUserAppServices, UserAppServices>();
            services.AddScoped<IAuthAppServices, AuthAppServices>();

            var jwtKey = Environment.GetEnvironmentVariable("JWT_Key") ?? configuration["Jwt:Key"] ?? String.Empty;

            services.AddSingleton<IJwtGenerator>(new JwtGenerator(jwtKey));

            return services;
        }
    }
}
