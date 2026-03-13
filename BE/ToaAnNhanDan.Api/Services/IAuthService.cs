using Azure;
using ToaAnNhanDan.Api.Dtos.Auth;

namespace ToaAnNhanDan.Api.Services
{
    public interface IAuthService
    {
        Task<(string Token, DateTime Exp, string UserId, string? UserName, string? Email, IList<string> Roles)?>
            LoginAsync(LoginModel model, CancellationToken ct = default);
        Task<(bool Success, string Message)> RegisterAsync(RegisterModel model, CancellationToken ct = default);
    }
}
