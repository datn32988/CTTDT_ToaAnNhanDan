using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(200)]
        public string AuthorName { get; set; } = string.Empty;

        public Post? Post { get; set; }
    }
}
