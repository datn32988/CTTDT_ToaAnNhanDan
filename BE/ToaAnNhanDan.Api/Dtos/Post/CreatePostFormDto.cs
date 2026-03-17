using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CreatePostFormDto
    {
        [Required]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(300)]
        public string? Title { get; set; }

        [Required]
        public string? Content { get; set; }

        public DateTime? CreatedAt { get; set; }

        public List<IFormFile> Files { get; set; } = [];

        public List<MediaType>? MediaTypes { get; set; }

        public List<int>? OrderIndexes { get; set; }

        public List<bool>? IsThumbnails { get; set; }
    }
}
