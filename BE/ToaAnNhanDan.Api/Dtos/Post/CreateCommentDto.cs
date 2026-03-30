using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreateCommentDto
    {
        [Required]
        public string Content { get; set; } = string.Empty;

        [MaxLength(200)]
        public string AuthorName { get; set; } = string.Empty;
    }
}
