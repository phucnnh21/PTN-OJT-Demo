using AutoMapper;
using IMP.EFCore;
using IMP.Infrastructure;
using System.Security.Claims;

namespace IMP.AppServices
{
    public class AuthAppServices : IAuthAppServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public AuthAppServices(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<AuthReponseDto?> Login(AuthRequestDto authRequest)
        {
            string hashedPassword = MD5Generator.Generate(authRequest.Password);

            // Try to get user
            User? userFromRepo = await _userRepository.GetUserAuth(authRequest.Email, hashedPassword);

            if (userFromRepo is null)
            {
                return null;
            }

            // Generate access token for auth
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, $"{userFromRepo.Id}"),
                new Claim(ClaimTypes.Email, userFromRepo.Email),
                new Claim(ClaimTypes.Name, userFromRepo.Name),
                new Claim(ClaimTypes.Role, userFromRepo.Role)
            };

            string accessToken = JwtGenerator.GenerateToken(claims, 2 * 24 * 60); // 2 days

            // Map user data for front-end display
            UserAuthDto userAuth = _mapper.Map<UserAuthDto>(userFromRepo);

            return new AuthReponseDto { Token = accessToken, User = userAuth };
        }

        public async Task<ServicesResponseDto<UserAuthDto>> Signup(UserCreateDto userCreate)
        {
            // Hash password
            userCreate.Password = MD5Generator.Generate(userCreate.Password);

            // Check if email exist
            bool userExist = (await _userRepository.GetByEmail(userCreate.Email)) is not null;

            if (userExist)
            {
                return new ServicesResponseDto<UserAuthDto> { Message = "Email duplicated", Status = 409 };
            }

            // Add user to db
            User user = _mapper.Map<User>(userCreate);

            User userFromRepo = await _userRepository.CreateUser(user);

            UserAuthDto userAuth = _mapper.Map<UserAuthDto>(userFromRepo);

            return new ServicesResponseDto<UserAuthDto> { Message = "User created", Status = 200, Data = userAuth };
        }
    }
}
