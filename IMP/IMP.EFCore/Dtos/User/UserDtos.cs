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
        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; } = null!;
    }

    public class UserUpdateDto
    {
        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        public string? Address { get; set; }
    }

    public class UserPaginationRequestDto : PaginationRequestDto
    {
        public string? Keyword { get; set; }
        public string? Role { get; set; }
    }

    public class UserPaginationDbDto : PaginationRequestDto
    {
        public Expression<Func<User, bool>> Expression { get; set; } = x => true;
    }
}
