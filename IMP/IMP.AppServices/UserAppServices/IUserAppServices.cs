using IMP.EFCore;

namespace IMP.AppServices
{
    public interface IUserAppServices
    {
        public Task<UserReadDto> GetUser(int userId);

        public Task<ServicesResponseDto<UserReadDto>> DeleteUser(int userId);

        public Task<ServicesResponseDto<UserReadDto>> UpdateUser(int userId, UserUpdateDto userUpdate);

        public Task<PaginationResponseDto<UserReadDto>> FilterUser(UserPaginationRequestDto userPagination);
    }
}
