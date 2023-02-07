using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using IMP.AppServices.Helpers;

namespace IMP.AppServices
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly string _key = "";

        public JwtGenerator(string key) { _key = key; }

        public string GenerateToken(IEnumerable<Claim> claims, uint minutes)
        {
            // Declare token and properties
            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenKey = Encoding.ASCII.GetBytes(_key);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(minutes), // Expires time
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature
                )
            };

            // Generate token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string token, bool validateLifetime = false)
        {
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = validateLifetime, // Validate lifetime of token
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero, // Disable default 5 mins of Microsoft
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_key))
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
                var jwtSercurityToken = securityToken as JwtSecurityToken;
                if (jwtSercurityToken == null || !jwtSercurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                return principal;
            } catch (Exception)
            {
                return null;
            }
        }

    }
}
