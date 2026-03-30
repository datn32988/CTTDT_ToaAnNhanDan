using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class PostCategory
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        public int? ParentId { get; set; }

        public PostCategory? Parent { get; set; }

        public ICollection<PostCategory> Children { get; set; } = new List<PostCategory>();

        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}