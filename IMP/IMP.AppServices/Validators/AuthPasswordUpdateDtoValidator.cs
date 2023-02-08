using FluentValidation;
using IMP.EFCore;
using IMP.Helpers;
using IMP.Infrastructure;

namespace IMP.AppServices.Validators
{
    public class AuthPasswordUpdateDtoValidator : AbstractValidator<AuthPasswordUpdateDto>
    {
        private readonly IUserRepository _userRepository;

        public AuthPasswordUpdateDtoValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            RuleFor(a => a.Id).NotEmpty().WithMessage("Id is required");

            RuleFor(a => a.OldPassword).NotEmpty().WithMessage("Old Password is required!");

            RuleFor(a => a.NewPassword)
                .NotEmpty().WithMessage("New Password is required!")
                .MinimumLength(8).WithMessage("Password is at least 8 characters!")
                .MaximumLength(50).WithMessage("Password is at most 50 characters!")
                .Matches(AppConstants.Password.Regex).WithMessage(AppConstants.Password.ErrorMessage);

            RuleFor(a => a).CustomAsync(async (request, context, cancellationToken) => {
                if (request.NewPassword != request.ConfirmPassword)
                {
                    context.AddFailure("Password Confirm must match!");
                }

                string oldPasswordHashed = MD5Generator.Generate(request.OldPassword); // Hash old password

                var expression = Utils.ConcatLambdaExpression<User>(u => u.Id == request.Id, u => u.Password == oldPasswordHashed);

                User? userFromRepo = await _userRepository.GetByCondition(expression);

                // Validate old password
                if (userFromRepo == null)
                {
                    context.AddFailure("Old password does not match");
                }
            });
        }
    }
}
