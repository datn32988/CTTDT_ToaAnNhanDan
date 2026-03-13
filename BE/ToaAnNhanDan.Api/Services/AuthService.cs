using Azure;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ToaAnNhanDan.Api.Dtos.Auth;
using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _users;
        private readonly RoleManager<IdentityRole> _roles;
        private readonly IConfiguration _cfg;

        public AuthService(UserManager<ApplicationUser> users, RoleManager<IdentityRole> roles,
            IConfiguration cfg)
        {
            _users = users;
            _roles = roles;
            _cfg = cfg;
        }
        public async Task<(string Token, DateTime Exp, string UserId, string? UserName, string? Email, IList<string> Roles)?> LoginAsync(LoginModel model, CancellationToken ct = default)
        {
            var userName = model.Username.Trim();
            var user = await _users.FindByNameAsync(userName);
            if (user == null)
            {
                throw new InvalidOperationException("Tên đăng nhập hoặc mật khẩu không đúng");
            }
            if (!await _users.CheckPasswordAsync(user, model.Password))
                throw new InvalidOperationException("Tên đăng nhập hoặc mật khẩu không đúng");
            var userRoles = await _users.GetRolesAsync(user);

            var claims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName ?? string.Empty),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
            foreach (var r in userRoles) claims.Add(new Claim(ClaimTypes.Role, r));

            var token = BuildJwt(claims);
            return (new JwtSecurityTokenHandler().WriteToken(token), token.ValidTo, user.Id, user.UserName, user.Email, userRoles);
        }

        public async Task<(bool Success, string Message)> RegisterAsync(RegisterModel model, CancellationToken ct = default)
        {
            if (await _users.FindByNameAsync(model.Username) is not null)
                return (false, "User already exists!");

            var user = new ApplicationUser { UserName = model.Username, Email = model.Email, SecurityStamp = Guid.NewGuid().ToString() };
            var result = await _users.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return(false, string.Join("; ", result.Errors.Select(e => e.Description)));

            if (!await _roles.RoleExistsAsync(UserRoles.USER))
                await _roles.CreateAsync(new IdentityRole(UserRoles.USER));
            await _users.AddToRoleAsync(user, UserRoles.USER);


            return (true, "User created. Please check your email to confirm.");
        }

        //helper
        private JwtSecurityToken BuildJwt(IEnumerable<Claim> claims)
        {
            var secret = _cfg["JWT:Secret"] ?? throw new InvalidOperationException("Missing JWT:Secret");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(3),
                claims: claims,
                signingCredentials: creds
            );
        }
    }
}
