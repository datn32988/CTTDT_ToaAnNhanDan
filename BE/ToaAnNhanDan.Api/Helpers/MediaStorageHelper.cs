using Microsoft.AspNetCore.Http;

namespace ToaAnNhanDan.Api.Helpers
{
    public static class MediaStorageHelper
    {
        public static async Task<string> SavePostMediaAsync(IFormFile file, IWebHostEnvironment env, CancellationToken ct = default)
        {
            if (file is null || file.Length == 0)
                throw new ArgumentException("File is required", nameof(file));

            var webRoot = env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot");
            var uploadFolder = Path.Combine(webRoot, "uploads", "posts");
            Directory.CreateDirectory(uploadFolder);

            var ext = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid():N}{ext}";
            var filePath = Path.Combine(uploadFolder, fileName);

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream, ct);
            }

            return $"/uploads/posts/{fileName}";
        }
    }
}
