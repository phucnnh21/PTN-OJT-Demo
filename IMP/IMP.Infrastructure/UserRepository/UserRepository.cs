using IMP.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace IMP.Infrastructure
{
    public class UserRepository: IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> GetById(int id)
        {
            var user = await _dbContext.Users
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, Address = u.Address, CreatedAt = u.CreatedAt, LastUpdatedAt = u.LastUpdatedAt })
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<User?> GetByCondition(Expression<Func<User, bool>> expression)
        {
            var user = await _dbContext.Users
                .Where(expression)
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, CreatedAt = u.CreatedAt })
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<User?> GetUserAuth(string email, string hashedPassword)
        {
            var user = await _dbContext.Users
                .Where(u => u.Email == email && u.Password == hashedPassword)
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email })
                .FirstOrDefaultAsync();
                

            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            await _dbContext.Users.AddAsync(user);

            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> DeleteUser(User user)
        {
            _dbContext.Users.Remove(user);

            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            // Attach the entity to context and set state as modified
            _dbContext.Users.Attach(user);
            _dbContext.Users.Entry(user).State = EntityState.Modified;

            Type type = typeof(User);
            PropertyInfo[] properties = type.GetProperties();
            foreach (PropertyInfo property in properties)
            {
                // After using DTO, some private fields became null, so this code is to prevent updating null fields.
                if (property.GetValue(user, null) == null)
                {
                    _dbContext.Users.Entry(user).Property(property.Name).IsModified = false;
                }
            }

            await _dbContext.SaveChangesAsync();

            return user;
        }

        public async Task<PaginationResponseDto<User>> FilterUsers(UserPaginationDbDto userPagination)
        {
            int count = await _dbContext.Users.Where(userPagination.Expression).CountAsync();

            IEnumerable<User> users = await _dbContext.Users
                .Where(userPagination.Expression)
                .Skip((userPagination.Page - 1) * userPagination.Size)
                .Take(userPagination.Size)
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, LastUpdatedAt = u.LastUpdatedAt })
                .ToListAsync();

            return new PaginationResponseDto<User> { Payload = users, Total = count };
        }
    }
}
