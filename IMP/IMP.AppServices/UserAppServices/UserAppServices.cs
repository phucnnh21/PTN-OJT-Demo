using AutoMapper;
using IMP.EFCore;
using IMP.Helpers;
using IMP.Infrastructure;
using LinqKit;
using System.Linq.Expressions;

namespace IMP.AppServices
{
    public class UserAppServices : IUserAppServices
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserAppServices(IUnitOfWork unitOfWork, IMapper mapper) {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserReadDto> GetUser(int userId)
        {
            User? user = await GetById(userId);

            return _mapper.Map<UserReadDto>(user);
        }

        public async Task<PaginationResponseDto<UserReadDto>> FilterUser(UserPaginationRequestDto userPagination)
        {
            UserPaginationDbDto userPaginationDbDto = _mapper.Map<UserPaginationDbDto>(userPagination);
            ExpressionStarter<User> predicate = PredicateBuilder.New<User>(true);

            // Filter by role
            if (!String.IsNullOrWhiteSpace(userPagination.Role))
            {
                predicate.And(u => u.Role.ToLower() == userPagination.Role.ToLower());
            }

            // Search
            if (!String.IsNullOrWhiteSpace(userPagination.Keyword))
            {
                predicate.And(u => u.Name.ToLower().Contains(userPagination.Keyword.ToLower()));
            }

            userPaginationDbDto.Expression = predicate;

            PaginationResponseDto<User> userList = await _unitOfWork.UserRepository.FilterUsers(userPaginationDbDto);

            PaginationResponseDto<UserReadDto> userListResult = _mapper.Map<PaginationResponseDto<UserReadDto>>(userList);

            return userListResult;
        }

        public async Task<ServicesResponseDto<UserReadDto>> DeleteUser(int userId)
        {
            // Check if user exist
            User? user = await GetById(userId);

            if (user is null)
            {
                return NotFoundUserAppServicesResponse();
            }

            await _unitOfWork.UserRepository.DeleteUser(user);
            _unitOfWork.SaveChanges();

            UserReadDto userResponse = _mapper.Map<UserReadDto>(user);

            return new ServicesResponseDto<UserReadDto> { Message = "User Deleted", Status = 200, Data = userResponse };
        }

        public async Task<ServicesResponseDto<UserReadDto>> UpdateUser(int userId, UserUpdateDto userUpdate)
        {
            // Check if user exist
            User? userFromRepo = await GetById(userId);

            if (userFromRepo is null)
            {
                return NotFoundUserAppServicesResponse();
            }

            User user = _mapper.Map(userUpdate, userFromRepo);

            await _unitOfWork.UserRepository.UpdateUser(user);
            _unitOfWork.SaveChanges();

            UserReadDto userResponse = _mapper.Map<UserReadDto>(user);

            return new ServicesResponseDto<UserReadDto> { Message = "User Updated", Status = 200, Data = userResponse };
        }

        private async Task<User?> GetById(int userId)
        {
            return await _unitOfWork.UserRepository.GetById(userId);
        }

        private ServicesResponseDto<UserReadDto> NotFoundUserAppServicesResponse()
        {
            return new ServicesResponseDto<UserReadDto> { Message = "Not found", Status = 404, Data = null };
        }
    }
}
