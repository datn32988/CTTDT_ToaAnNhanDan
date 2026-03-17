using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostCategory
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public int? ParentId { get; set; }
    }
}
