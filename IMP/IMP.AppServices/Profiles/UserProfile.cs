using AutoMapper;
using IMP.EFCore;

namespace IMP.AppServices
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserReadDto>();

            CreateMap<User, UserAuthDto>();

            CreateMap<UserCreateDto, User>();

            CreateMap<UserUpdateDto, User>();

            CreateMap<PaginationResponseDto<User>, PaginationResponseDto<UserReadDto>>();
        }
    }
}
