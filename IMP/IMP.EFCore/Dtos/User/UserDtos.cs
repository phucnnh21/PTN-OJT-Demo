using IMP.EFCore;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace IMP.EFCore
{
    public class UserReadDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        public string Role { get; set; } = UserRole.USER;

        [StringLength(100)]
        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastUpdatedAt { get; set; }
    }

    public class UserAuthDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        public string Role { get; set; } = UserRole.USER;
    }

    public class UserCreateDto
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;
    }

    public class UserPasswordCreateDto
    {
        public string Token { get; set; } = null!;

        public string Password { get; set; } = null!;
    }

    public class UserTokenVerifyDto
    {
        public string Token { get; set; } = null!;
    }

    public class UserUpdateDto
    {
        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        public string? Address { get; set; }

        public DateTime LastUpdatedAt { get; set; } = DateTime.Now;
    }

    public class UserPaginationRequestDto : GenericQueryDto
    {
        public string? Role { get; set; }
    }

    public class UserPaginationDbDto : PaginationRequestDto
    {
        public Expression<Func<User, bool>> Expression { get; set; } = x => true;
    }
}
