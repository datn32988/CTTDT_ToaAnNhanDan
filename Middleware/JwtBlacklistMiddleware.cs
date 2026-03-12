using PortalWeb.Controllers;

namespace PortalWeb.Middleware
{
    public class JwtBlacklistMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtBlacklistMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Lấy token từ Authorization header
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                var token = authHeader.Substring(7); // Bỏ "Bearer " prefix
                
                // Kiểm tra token có trong blacklist không
                if (AuthController.IsTokenBlacklisted(token))
                {
                    context.Response.StatusCode = 401;
                    await context.Response.WriteAsync("Token đã bị vô hiệu hóa");
                    return;
                }
            }

            await _next(context);
        }
    }
}
