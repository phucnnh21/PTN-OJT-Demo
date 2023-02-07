using IMP.AppServices.Helpers;
using IMP.EFCore;
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

            services.AddSingleton<IJwtGenerator>(new JwtGenerator(configuration["Jwt:Key"]));

            services.AddTransient<IMailService, MailService>();
            services.Configure<MailSettings>(configuration.GetSection("MailSettings"));

            return services;
        }
    }
}
