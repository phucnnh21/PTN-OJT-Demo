using FluentValidation;
using IMP.AppServices.Helpers;
using IMP.EFCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IMP.AppServices.Validators
{
    public class UserPasswordCreateDtoValidator : AbstractValidator<UserPasswordCreateDto>
    {
        private readonly IJwtGenerator _jwtGenerator;

        public UserPasswordCreateDtoValidator(IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;

            RuleFor(u => u.Token).NotEmpty().WithMessage("Token is required");

            RuleFor(u => u.Password)
                .NotEmpty().WithMessage("New Password is required!")
                .MinimumLength(8).WithMessage("Password is at least 8 characters!")
                .MaximumLength(50).WithMessage("Password is at most 50 characters!")
                .Matches(AppConstants.Password.Regex).WithMessage(AppConstants.Password.ErrorMessage);

            RuleFor(u => u).Custom((request, context) => {
                // Get data from Token
                ClaimsPrincipal? claimsPrincipal = _jwtGenerator.GetPrincipalFromToken(request.Token, true);

                if (claimsPrincipal == null)
                {
                    context.AddFailure("Token validate failed!");
                }
            });
        }
    }
}
