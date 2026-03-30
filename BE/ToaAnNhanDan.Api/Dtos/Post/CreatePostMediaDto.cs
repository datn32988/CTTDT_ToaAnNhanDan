using System.ComponentModel.DataAnnotations;
using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostMediaDto
    {
        [Required]
        [MaxLength(500)]
        public string Url { get; set; } = string.Empty;

        [Required]
        public MediaType MediaType { get; set; }

        public int OrderIndex { get; set; }

        public bool? IsThumbnail { get; set; }
    }
}
