using FluentValidation;
using IMP.EFCore;

namespace IMP.AppServices.Validators
{
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(u => u.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(40).WithMessage("Name is 40 characters at most");

            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("Name is required")
                .EmailAddress().WithMessage("Email is not in the right format");
        }
    }
}
