using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class PostCategory
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}