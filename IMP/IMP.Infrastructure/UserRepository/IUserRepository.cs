using IMP.EFCore;

namespace IMP.Infrastructure
{
    public interface IUserRepository
    {
        public Task<User?> GetById(int id);
        public Task<User?> GetByEmail(string email);
        public Task<User?> GetUserAuth(string email, string hashedPassword);
        public Task<User> CreateUser(User user);
        public Task<User> DeleteUser(User user);
        public Task<User> UpdateUser(User user);
        public Task<PaginationResponseDto<User>> FilterUsers(UserPaginationDbDto userPagination);
    }
}
