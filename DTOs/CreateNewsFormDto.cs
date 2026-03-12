using System.ComponentModel.DataAnnotations;

namespace PortalWeb.DTOs
{
    public class CreateNewsFormDto
    {
        [Required(ErrorMessage = "Tiêu đề là bắt buộc")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nội dung là bắt buộc")]
        public string Content { get; set; } = string.Empty;

        public IFormFile? Image { get; set; }
    }
}