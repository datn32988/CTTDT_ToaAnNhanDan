namespace PortalWeb.Models
{
    public class News
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string Content { get; set; } = string.Empty; // HTML content
        public string? ThumbnailUrl { get; set; } // Ảnh đại diện
        public string? Slug { get; set; }
        public int? CategoryId { get; set; }
        public int? AuthorId { get; set; }
        public string? Author { get; set; } // Backward compatibility
        public bool IsPublished { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public int ViewCount { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        public DateTime? PublishedDate { get; set; }
        
        // Navigation properties
        public virtual Category? Category { get; set; }
        public virtual User? AuthorUser { get; set; }
        public virtual ICollection<NewsImage> Images { get; set; } = new List<NewsImage>();
    }

    public class NewsImage
    {
        public int Id { get; set; }
        public int NewsId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; } // Chú thích ảnh
        public int DisplayOrder { get; set; } = 0; // Thứ tự hiển thị
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        
        // Navigation properties
        public virtual News News { get; set; } = null!;
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Slug { get; set; }
        public string? Icon { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        
        // Navigation properties
        public virtual ICollection<News> News { get; set; } = new List<News>();
    }
}
