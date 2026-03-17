using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class PostMediaDto
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public MediaType MediaType { get; set; }
        public int OrderIndex { get; set; }
        public bool? IsThumbnail { get; set; }
    }
}
