using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IMP.AppServices.Helpers
{
    public interface IJwtGenerator
    {
        public string GenerateToken(IEnumerable<Claim> claims, uint minutes);
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token, bool validateLifetime = false);
    }
}
