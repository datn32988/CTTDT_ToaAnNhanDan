using System.ComponentModel.DataAnnotations;

namespace ToaAnNhanDan.Api.Models
{
    public class PostMedia
    {
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        [MaxLength(500)]
        public string Url { get; set; } = string.Empty;

        [Required]
        public MediaType MediaType { get; set; }

        public int OrderIndex { get; set; }

        public bool? IsThumbnail { get; set; }

        public Post? Post { get; set; }
    }
}
