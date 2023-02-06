using AutoMapper;
using IMP.AppServices.Helpers;
using IMP.EFCore;
using IMP.Infrastructure;
using System.Security.Claims;

namespace IMP.AppServices
{
    public class AuthAppServices : IAuthAppServices
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtGenerator _jwtGenerator;

        public AuthAppServices(IUserRepository userRepository, IMapper mapper, IJwtGenerator jwtGenerator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtGenerator = jwtGenerator;
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

            string accessToken = _jwtGenerator.GenerateToken(claims, 2 * 24 * 60); // 2 days

            // Map user data for front-end display
            UserAuthDto userAuth = _mapper.Map<UserAuthDto>(userFromRepo);

            return new AuthReponseDto { Token = accessToken, User = userAuth };
        }

        public async Task<ServicesResponseDto<UserAuthDto>> Signup(UserCreateDto userCreate)
        {
            // Hash password
            userCreate.Password = MD5Generator.Generate(userCreate.Password);

            // Check if email exist
            bool userExist = (await _userRepository.GetByCondition(u => u.Email == userCreate.Email)) is not null;

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

        public async Task<ServicesResponseDto<bool>> UpdatePassword(AuthPasswordUpdateDto userUpdate)
        {
            // Validate confirm password
            if (userUpdate.NewPassword != userUpdate.ConfirmPassword)
            {
                return new ServicesResponseDto<bool> { Message = "Password confirm does not match", Status = 400 };
            }

            string oldPasswordHashed = MD5Generator.Generate(userUpdate.OldPassword); // Hash old password

            var expression = Utils.ConcatLambdaExpression<User>(u => u.Id == userUpdate.Id, u => u.Password == oldPasswordHashed);

            User? userFromRepo = await _userRepository.GetByCondition(expression);
        
            // Validate old password
            if (userFromRepo == null)
            {
                return new ServicesResponseDto<bool> { Message = "Old password does not match", Status = 400 };
            }

            userFromRepo.Password = MD5Generator.Generate(userUpdate.NewPassword); // Hash password

            await _userRepository.UpdateUser(userFromRepo);

            return new ServicesResponseDto<bool> { Message = "Success", Status = 200 };
        }
    }
}
