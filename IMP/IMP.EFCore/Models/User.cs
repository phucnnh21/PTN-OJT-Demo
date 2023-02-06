using System.ComponentModel.DataAnnotations;

namespace IMP.EFCore
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; } = null!;

        [Required]
        public string Role { get; set; } = UserRole.USER;

        [StringLength(100)]
        public string? Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime LastUpdatedAt { get; set; } = DateTime.Now;
    }
}
