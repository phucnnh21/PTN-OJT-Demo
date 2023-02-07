using IMP.EFCore;

namespace IMP.AppServices
{
    public interface IAuthAppServices
    {
        public Task<AuthReponseDto?> Login(AuthRequestDto authRequest);

        public Task<ServicesResponseDto<UserAuthDto>> Signup(UserCreateDto userCreate);

        public Task<ServicesResponseDto<UserAuthDto>> CreatePassword(UserPasswordCreateDto userPasswordCreateDto);

        public Task<ServicesResponseDto<bool>> UpdatePassword(AuthPasswordUpdateDto userUpdate);
    }
}
