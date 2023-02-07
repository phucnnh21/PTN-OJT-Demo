using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.EFCore
{
    public class AuthRequestDto
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }

    public class AuthReponseDto
    {
        public string? Token { get; set; }

        public UserAuthDto? User { get; set; }
    }

    public class AuthPasswordUpdateDto
    {
        public int Id { get; set; }

        public string OldPassword { get; set; } = null!;

        public string NewPassword { get; set; } = null!;

        public string ConfirmPassword { get; set; } = null!;
    }
}
