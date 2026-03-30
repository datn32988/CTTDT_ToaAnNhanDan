using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class UploadMediaDto
    {
        [Required]
        public IFormFile File { get; set; } = null!;
    }
}
