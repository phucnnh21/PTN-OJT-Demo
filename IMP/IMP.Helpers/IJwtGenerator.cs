using System.Security.Claims;

namespace IMP.Helpers
{
    public interface IJwtGenerator
    {
        public string GenerateToken(IEnumerable<Claim> claims, uint minutes);
        public ClaimsPrincipal? GetPrincipalFromToken(string token, bool validateLifetime = false);
    }
}
