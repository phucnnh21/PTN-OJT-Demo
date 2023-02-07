using AutoMapper.Internal;
using Hangfire;
using IMP.EFCore;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.AppServices.Helpers
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        [AutomaticRetry(Attempts = 10)]
        public async Task SendMail(MailContent mailContent)
        {
            // Multipurpose Internet Mail Extensions (MIME) are a set of conventions for encoding and representing information for electronic mail.
            var email = new MimeMessage();

            // Set the sender email address
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);

            // Send mail to the receiver, the receiver can be a single email or a list of emails
            email.To.Add(MailboxAddress.Parse(mailContent.To));

            email.Subject = mailContent.Subject;

            var builder = new BodyBuilder();

            // Set the body of the email
            builder.HtmlBody = mailContent.Body;
            email.Body = builder.ToMessageBody();

            // Use SMTP of MailKit instead of default SMTP
            using var smtp = new MailKit.Net.Smtp.SmtpClient();

            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);

            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
