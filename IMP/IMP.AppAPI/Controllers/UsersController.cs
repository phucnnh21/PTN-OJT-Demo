using IMP.AppServices;
using IMP.EFCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace IMP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserAppServices _userServices;

        public UsersController(IUserAppServices userServices)
        {
            _userServices = userServices;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _userServices.GetUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize(Roles = UserRole.ADMIN)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ServicesResponseDto<UserReadDto> response = await _userServices.DeleteUser(id);

            if (response.Status == 404)
            {
                return NotFound();
            }

            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDto userUpdate)
        {
            ServicesResponseDto<UserReadDto> response = await _userServices.UpdateUser(id, userUpdate);

            if (response.Status == 404)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpPost("filter")]
        public async Task<IActionResult> Filter([FromBody] UserPaginationRequestDto userPagination)
        {
            PaginationResponseDto<UserReadDto> userListResult = await _userServices.FilterUser(userPagination);

            return Ok(userListResult);
        }
    }
}
