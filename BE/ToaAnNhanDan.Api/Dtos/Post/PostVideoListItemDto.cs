using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class PostVideoListItemDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int RootCategoryId { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string? ThumbnailUrl { get; set; }
        public MediaType? ThumbnailMediaType { get; set; }
        public string? VideoUrl { get; set; }
    }
}
