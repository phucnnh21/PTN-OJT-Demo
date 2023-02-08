using IMP.EFCore;

namespace IMP.BackgroundServices
{
    public interface IMailService
    {
        Task SendMail(MailContent mailContent);
        void SendMailBackground(MailContent mailContent);
    }
}
