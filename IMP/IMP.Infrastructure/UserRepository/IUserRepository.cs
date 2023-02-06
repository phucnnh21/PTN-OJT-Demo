using IMP.EFCore;
using System.Linq.Expressions;

namespace IMP.Infrastructure
{
    public interface IUserRepository
    {
        public Task<User?> GetById(int id);
        public Task<User?> GetUserAuth(string email, string hashedPassword);
        public Task<User> CreateUser(User user);
        public Task<User> DeleteUser(User user);
        public Task<User> UpdateUser(User user);
        public Task<PaginationResponseDto<User>> FilterUsers(UserPaginationDbDto userPagination);
        public Task<User?> GetByCondition(Expression<Func<User, bool>> expression);
    }
}
