using IMP.AppServices;
using IMP.EFCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IMP.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthAppServices _authServices;
        private readonly IConfiguration _configuration;
        private readonly string _hubServerUri = "";

        public AuthController(IAuthAppServices authServices, IConfiguration configuration)
        {
            _authServices = authServices;
            _configuration = configuration;
            _hubServerUri = _configuration.GetValue<string>("Servers:Hubs");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthRequestDto authRequest)
        {
            AuthReponseDto? authResponse = await _authServices.Login(authRequest);

            if (authResponse is null)
            {
                return BadRequest("Wrong credentials");
            }

            return Ok(authResponse);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(UserCreateDto userCreate)
        {
            ServicesResponseDto<UserAuthDto> servicesResponse = await _authServices.Signup(userCreate);

            if (servicesResponse.Status is 409)
            {
                return Conflict(servicesResponse.Message);
            }

            await HttpClientHelpers.PostAsync<UserCreateDto>($"{_hubServerUri}/api/notification/notify-admin", userCreate);
            return Ok(servicesResponse.Data);
        }

        [HttpPost("verify-token")]
        public IActionResult VerifyToken(UserTokenVerifyDto userToken)
        {
            return Ok(userToken);
        }

        [HttpPost("password-create")]
        public async Task<IActionResult> PasswordCreate(UserPasswordCreateDto userPasswordCreateDto)
        {
            ServicesResponseDto<UserAuthDto> servicesResponse = await _authServices.CreatePassword(userPasswordCreateDto);

            if (servicesResponse.Status is 400)
            {
                return BadRequest(servicesResponse.Message);
            }

            if (servicesResponse.Status is 409)
            {
                return Conflict(servicesResponse.Message);
            }

            return Ok(servicesResponse.Data);
        }

        [Authorize]
        [HttpPut("password-update")]
        public async Task<IActionResult> PasswordUpdate(AuthPasswordUpdateDto userUpdate)
        {
            ServicesResponseDto<bool> servicesResponse = await _authServices.UpdatePassword(userUpdate);

            if (servicesResponse.Status is 400)
            {
                return BadRequest(servicesResponse.Message);
            }

            return Ok(servicesResponse.Message);
        }
    }
}
