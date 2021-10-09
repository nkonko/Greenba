using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Business.Interfaces;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace Business.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<AppUser> userManager;
        private readonly ILogger<TokenService> logger;
        private readonly SymmetricSecurityKey key;

        public TokenService(IConfiguration configuration, UserManager<AppUser> userManager, ILogger<TokenService> logger)
        {
            this.configuration = configuration;
            this.userManager = userManager;
            this.logger = logger;
            key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Key"]));
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.DisplayName),
            };

            var roles = await userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = configuration["Token:Issuer"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token, out string userName)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var issuer = configuration["Token:Issuer"];
            var parameters = new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = true,
                ValidIssuer = issuer,
                IssuerSigningKey = key,
                ValidateIssuerSigningKey = true
            };

            try
            {
                tokenHandler.ValidateToken(token, parameters, out var validatedToken);
                var securityToken = new JwtSecurityToken(token);
                userName = securityToken.Claims.FirstOrDefault(c => c.Type == "email").Value;
                return true;
            }
            catch (Exception e)
            {
                logger.LogError("Invalid token", e);
                userName = string.Empty;
                return false;
            }
        }
    }
}
