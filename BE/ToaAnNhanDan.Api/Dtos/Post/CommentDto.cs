namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string AuthorName { get; set; } = string.Empty;
    }
}
