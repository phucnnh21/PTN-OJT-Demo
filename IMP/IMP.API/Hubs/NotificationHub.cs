using IMP.EFCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace IMP.API
{
    public class NotificationHub : Hub
    {
        [Authorize(Roles = UserRole.ADMIN)]
        public override async Task OnConnectedAsync()
        {
            try
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, UserRole.ADMIN);
            }
            catch (Exception)
            {
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {

            try
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, UserRole.ADMIN);
            }
            catch (Exception)
            {
            }

            await base.OnConnectedAsync();
        }

        public async Task SendMessage(string message)
        {
            await Clients.Group(UserRole.ADMIN).SendAsync("Notification", message, DateTime.Now);
        }
    }
}
