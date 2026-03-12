using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalWeb.Data;
using PortalWeb.Models;


namespace PortalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<UploadController> _logger;

        public UploadController(AppDBContext context, IWebHostEnvironment env, ILogger<UploadController> logger)
        {
            _context = context;
            _env = env;
            _logger = logger;
        }

        // FIX: Dùng class wrapper thay vì IFormFile trực tiếp để Swagger hiểu được
        public class DocumentUploadRequest
        {
            public IFormFile File { get; set; } = null!;
        }

        public class ImageUploadRequest
        {
            public IFormFile File { get; set; } = null!;
        }

        [HttpPost("document")]
        [Authorize(Roles = "Admin,Editor")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadDocument([FromForm] DocumentUploadRequest request)
        {
            var file = request.File;

            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Vui lòng chọn file" });

            var allowedExtensions = new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
                return BadRequest(new { message = "Chỉ chấp nhận file: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX" });

            if (file.Length > 20 * 1024 * 1024)
                return BadRequest(new { message = "File tối đa 20MB" });

            try
            {
                var fileName = $"{Guid.NewGuid():N}{extension}";
                var uploadsFolder = Path.Combine(_env.ContentRootPath, "uploads", "documents");
                var filePath = Path.Combine(uploadsFolder, fileName);

                Directory.CreateDirectory(uploadsFolder);
                await using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                return Ok(new
                {
                    message = "Upload file thành công",
                    fileUrl = $"/uploads/documents/{fileName}",
                    fileName = file.FileName,
                    fileType = extension.Replace(".", "").ToUpper(),
                    fileSize = file.Length
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi upload file");
                return StatusCode(500, new { message = "Lỗi server khi upload file" });
            }
        }

        [HttpPost("image")]
        [Authorize(Roles = "Admin,Editor")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage([FromForm] ImageUploadRequest request)
        {
            var file = request.File;

            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Vui lòng chọn file ảnh" });

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".gif" };
            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
                return BadRequest(new { message = "Chỉ chấp nhận file ảnh: jpg, jpeg, png, webp, gif" });

            if (file.Length > 5 * 1024 * 1024)
                return BadRequest(new { message = "Ảnh tối đa 5MB" });

            try
            {
                var fileName = $"{Guid.NewGuid():N}{extension}";
                var uploadsFolder = Path.Combine(_env.ContentRootPath, "uploads", "images");
                var filePath = Path.Combine(uploadsFolder, fileName);

                Directory.CreateDirectory(uploadsFolder);
                await using var stream = new FileStream(filePath, FileMode.Create);
                await file.CopyToAsync(stream);

                return Ok(new
                {
                    message = "Upload ảnh thành công",
                    imageUrl = $"/uploads/images/{fileName}",
                    fileName = fileName
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi upload ảnh");
                return StatusCode(500, new { message = "Lỗi server khi upload ảnh" });
            }
        }

        [HttpDelete("document/{fileName}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteDocument(string fileName)
        {
            try
            {
                var filePath = Path.Combine(_env.ContentRootPath, "uploads", "documents", fileName);

                if (!System.IO.File.Exists(filePath))
                    return NotFound(new { message = "Không tìm thấy file" });

                System.IO.File.Delete(filePath);
                return Ok(new { message = "Xóa tài liệu thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi xóa tài liệu");
                return StatusCode(500, new { message = "Lỗi server khi xóa tài liệu" });
            }
        }

        [HttpDelete("image/{fileName}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteImage(string fileName)
        {
            try
            {
                var filePath = Path.Combine(_env.ContentRootPath, "uploads", "images", fileName);

                if (!System.IO.File.Exists(filePath))
                    return NotFound(new { message = "Không tìm thấy file" });

                System.IO.File.Delete(filePath);
                return Ok(new { message = "Xóa ảnh thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi khi xóa ảnh");
                return StatusCode(500, new { message = "Lỗi server khi xóa ảnh" });
            }
        }
    }
}