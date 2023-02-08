using IMP.EFCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace IMP.Hubs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : Controller
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public NotificationController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("notify-admin")]
        public async Task<IActionResult> NotifyAdmin(UserCreateDto userCreate)
        {
            await _hubContext.Clients.Group(UserRole.ADMIN).SendAsync("Notification", $"User {userCreate.Email} has signed up!", DateTime.Now);
            return Ok();
        }
    }
}
