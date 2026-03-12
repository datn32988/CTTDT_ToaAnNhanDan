using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PortalWeb.Data;
using PortalWeb.DTOs;
using PortalWeb.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PortalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;
        

        private static readonly HashSet<string> BlacklistedTokens = new HashSet<string>();
        
        public AuthController(AppDBContext context, IConfiguration config, ILogger<AuthController> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username.ToLower() == dto.Username.ToLower());
                
                if (user == null || !user.IsActive || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                    return Unauthorized("Sai thông tin đăng nhập");
                
                var token = GenerateToken(user);
                
                // Update last login date
                user.LastLoginDate = DateTime.Now;
                await _context.SaveChangesAsync();
                
                return Ok(new { 
                    token = token,
                    user = new
                    {
                        id = user.Id,
                        username = user.Username,
                        email = user.Email,
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        role = user.Role.ToString()
                    },
                    message = "Đăng nhập thành công",
                    expires = DateTime.Now.AddHours(24)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, new { error = ex.Message });
            }
        }
        
        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // Thêm JTI cho blacklist
            };
            
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: creds
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("logout")]
        [Authorize]
        public IActionResult Logout()
        {
            var username = User.Identity?.Name;
            
            // Lấy token từ header
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            
            // Thêm token vào blacklist
            if (!string.IsNullOrEmpty(token))
            {
                BlacklistedTokens.Add(token);
                Console.WriteLine($"Token added to blacklist for user {username}");
            }
            
            Console.WriteLine($"User {username} logged out at {DateTime.Now}");
            
            return Ok(new
            {
                message = "Đăng xuất thành công",
                timestamp = DateTime.Now
            });
        }
        
        // Method để kiểm tra token có trong blacklist không
        public static bool IsTokenBlacklisted(string token)
        {
            return BlacklistedTokens.Contains(token);
        }
    }
}