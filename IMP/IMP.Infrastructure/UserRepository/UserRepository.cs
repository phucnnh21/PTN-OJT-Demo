using IMP.EFCore;
using IMP.Helpers;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace IMP.Infrastructure
{
    public class UserRepository: IUserRepository
    {
        private readonly AppDbContext _dbContext;
        private readonly DbSet<User> _dbSet;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<User>();
        }

        public async Task<User?> GetById(int id)
        {
            var user = await _dbSet
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, Address = u.Address, CreatedAt = u.CreatedAt, LastUpdatedAt = u.LastUpdatedAt })
                .FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<User?> GetByCondition(Expression<Func<User, bool>> expression)
        {
            var user = await _dbSet
                .Where(expression)
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, CreatedAt = u.CreatedAt })
                .FirstOrDefaultAsync();

            return user;
        }

        public async Task<User?> GetUserAuth(string email, string hashedPassword)
        {
            var user = await _dbSet
                .Where(u => u.Email == email && u.Password == hashedPassword)
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email })
                .FirstOrDefaultAsync();
                

            return user;
        }

        public async Task<User> CreateUser(User user)
        {
            await _dbSet.AddAsync(user);

            return user;
        }

        public async Task<User> DeleteUser(User user)
        {
            _dbSet.Remove(user);

            return user;
        }

        public async Task<User> UpdateUser(User user)
        {
            // Attach the entity to context and set state as modified
            _dbSet.Attach(user);
            _dbSet.Entry(user).State = EntityState.Modified;

            Type type = typeof(User);
            PropertyInfo[] properties = type.GetProperties();
            foreach (PropertyInfo property in properties)
            {
                // After using DTO, some private fields became null, so this code is to prevent updating null fields.
                if (property.GetValue(user, null) == null)
                {
                    _dbSet.Entry(user).Property(property.Name).IsModified = false;
                }
            }

            return user;
        }

        public async Task<PaginationResponseDto<User>> FilterUsers(UserPaginationRequestDto userPagination)
        {
            ExpressionStarter<User> predicate = PredicateBuilder.New<User>(true);

            // Filter by role
            if (!String.IsNullOrWhiteSpace(userPagination.Role))
            {
                predicate.And(u => u.Role.ToLower() == userPagination.Role.ToLower());
            }

            // Query filter
            IQueryable <User> userFilterQuery = _dbSet.AsEnumerable().Where(predicate).AsQueryable();

            // Query search
            IQueryable<User> userSearchQuery = userFilterQuery
                .Where(u => QueryHelpers.Match(u, userPagination))
                .Select(u => new User { Id = u.Id, Name = u.Name, Role = u.Role, Email = u.Email, LastUpdatedAt = u.LastUpdatedAt });

            // Sort
            IQueryable<User> userSortQuery = QueryHelpers.OrderBy(userSearchQuery, userPagination.OrderBy);

            // Query paginate
            IQueryable<User> userPaginateQuery = userSortQuery
                .Skip((userPagination.Page - 1) * userPagination.Size)
                .Take(userPagination.Size);

            IEnumerable<User> payload = userPaginateQuery.ToList();
            int total = userSearchQuery.Count();

            return new PaginationResponseDto<User> { Payload = payload, Total = total };
        }
       
    }
}
