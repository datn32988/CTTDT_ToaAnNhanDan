using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public int IdCategory { get; set; }

        [Required]
        public string AuthorId { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Image { get; set; } = string.Empty;

        [Required]
        [MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Doc { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.UtcNow;

        public PostCategory? Category { get; set; }
        
        public ApplicationUser? Author { get; set; }
    }
}