using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(300)]
        public string? Title { get; set; }

        [Required]
        public string? Content { get; set; }

        public DateTime? CreatedAt { get; set; }

        public List<CreatePostMediaDto>? Media { get; set; }
    }
}
