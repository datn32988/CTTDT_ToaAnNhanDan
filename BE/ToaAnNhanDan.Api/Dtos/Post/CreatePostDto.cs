using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public int IdCategory { get; set; }

        [Required]
        public string? AuthorId { get; set; }

        [MaxLength(500)]
        public string? Image { get; set; }

        [Required]
        [MaxLength(300)]
        public string? Title { get; set; }

        [Required]
        public string? Doc { get; set; }

        public DateTime? Date { get; set; }
    }
}
