namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class PostListItemDto
    {
        public int Id { get; set; }
        public int IdCategory { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}