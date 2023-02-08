using IMP.EFCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IMP.BackgroundServices
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBackgroundSevices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IMailService, MailService>();
            services.Configure<MailSettings>(configuration.GetSection("MailSettings"));

            return services;
        }
    }
}
