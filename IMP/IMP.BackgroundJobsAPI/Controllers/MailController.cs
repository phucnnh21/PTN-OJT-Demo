using IMP.BackgroundServices;
using IMP.EFCore;
using Microsoft.AspNetCore.Mvc;

namespace IMP.HangfireAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailController : Controller
    {
        private readonly IMailService _mailService;

        public MailController(IMailService mailService) {
            _mailService = mailService;

        }

        [HttpPost("send-mail")]
        public IActionResult SendMail(MailContent mailContent)
        {
            _mailService.SendMailBackground(mailContent);

            return Ok();
        }
    }
}
