using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class PostDetailDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int RootCategoryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<PostMediaDto> Media { get; set; } = [];
        public List<CommentDto> Comments { get; set; } = [];
    }
}