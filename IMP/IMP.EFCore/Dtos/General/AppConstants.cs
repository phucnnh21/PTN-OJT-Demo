using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IMP.EFCore
{
    public static class AppConstants
    {
        public static class Password
        {
            public const string Regex = "^[a-zA-Z0-9!@#$%^&*_-]{8,50}$";
            public const string ErrorMessage = "Password can only contains alphabet, uppercase, number and these special characters: !@#$%^&*_-";
        }

        public static class UserRole
        {
            public const string ADMIN = "admin";
            public const string USER = "user";
        }
    }
}
