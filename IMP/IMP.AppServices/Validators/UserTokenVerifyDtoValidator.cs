using FluentValidation;
using IMP.EFCore;
using IMP.Helpers;
using IMP.Infrastructure;
using System.Security.Claims;

namespace IMP.AppServices.Validators
{
    public class UserTokenVerifyDtoValidator : AbstractValidator<UserTokenVerifyDto>
    {
        private readonly IJwtGenerator _jwtGenerator;
        private readonly IUnitOfWork _unitOfWork;
        public UserTokenVerifyDtoValidator(IJwtGenerator jwtGenerator, IUnitOfWork unitOfWork)
        {
            _jwtGenerator = jwtGenerator;
            _unitOfWork = unitOfWork;

            RuleFor(u => u).Custom((request, context) => {
                // Get data from Token
                ClaimsPrincipal? claimsPrincipal = _jwtGenerator.GetPrincipalFromToken(request.Token, true);

                if (claimsPrincipal == null)
                {
                    TokenFailedMessage(context);
                    return;
                }

                string? userEmail = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;

                // Check if email exist
                bool userExist = _unitOfWork.UserRepository.GetByCondition(u => u.Email == userEmail).Result is not null;

                if (userExist)
                {
                    TokenFailedMessage(context);
                    return;
                }
            });
        }

        private void TokenFailedMessage(ValidationContext<UserTokenVerifyDto> context)
        {
            context.AddFailure("Token validate failed!");
        }
    }
}
