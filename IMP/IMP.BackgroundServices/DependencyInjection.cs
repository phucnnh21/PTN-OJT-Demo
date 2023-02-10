using IMP.EFCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace IMP.BackgroundServices
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddBackgroundSevices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IMailService, MailService>();

            if (Environment.GetEnvironmentVariable("MaillSettings_Mail") is not null)
            {
                services.Configure<MailSettings>(mailSettings =>
                {
                    mailSettings.Mail = Environment.GetEnvironmentVariable("MaillSettings_Mail");
                    mailSettings.Host = Environment.GetEnvironmentVariable("MaillSettings_Host");
                    mailSettings.DisplayName = Environment.GetEnvironmentVariable("MaillSettings_DisplayName");
                    mailSettings.Password = Environment.GetEnvironmentVariable("MaillSettings_Password");

                    int port = 0;
                    bool parsed = int.TryParse(Environment.GetEnvironmentVariable("MaillSettings_Port"), out port);
                    mailSettings.Port = port;
                });
            } else
            {
                services.Configure<MailSettings>(configuration.GetSection("MailSettings"));
            }

            return services;
        }
    }
}
