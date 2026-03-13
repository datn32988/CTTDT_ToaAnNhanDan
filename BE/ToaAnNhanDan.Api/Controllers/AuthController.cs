using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToaAnNhanDan.Api.Dtos.Auth;
using ToaAnNhanDan.Api.Services;

namespace ToaAnNhanDan.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService auth) : ControllerBase
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model, CancellationToken ct)
        {
            try
            {
                var r = await auth.LoginAsync(model, ct);

                return Ok(new
                {
                    token = r.Value.Token,
                    expiration = r.Value.Exp,
                    userId = r.Value.UserId,
                    userName = r.Value.UserName,
                    userEmail = r.Value.Email,
                    roles = r.Value.Roles
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register")]
        [Authorize]
        public async Task<IActionResult> Register([FromBody] RegisterModel model, CancellationToken ct)
        {
            var result = await auth.RegisterAsync(model, ct);
            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new { message = result.Message });
        }
    }
}
