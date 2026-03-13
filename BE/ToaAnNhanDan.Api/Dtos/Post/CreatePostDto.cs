using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public int IdCategory { get; set; }

        public IFormFile? Image { get; set; }

        [Required]
        [MaxLength(300)]
        public string? Title { get; set; }

        [Required]
        public string? Doc { get; set; }

        public DateTime? Date { get; set; }
    }
}
