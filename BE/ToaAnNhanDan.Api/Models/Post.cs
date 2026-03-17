using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(300)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int CategoryId { get; set; }

        public PostCategory? Category { get; set; }

        [Required]
        public string AuthorId { get; set; } = string.Empty;

        public ApplicationUser? Author { get; set; }

        public ICollection<PostMedia> Media { get; set; } = new List<PostMedia>();

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}