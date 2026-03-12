namespace PortalWeb.DTOs
{
    public class NewsDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? ThumbnailUrl { get; set; }
        public string? Slug { get; set; }
        public int? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public int? AuthorId { get; set; }
        public string? AuthorName { get; set; }
        public bool IsPublished { get; set; }
        public bool IsFeatured { get; set; }
        public int ViewCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? PublishedDate { get; set; }
        public List<NewsImageDTO> Images { get; set; } = new List<NewsImageDTO>();
    }

    public class NewsImageDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class CreateNewsDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? ThumbnailUrl { get; set; }
        public string? Slug { get; set; }
        public int? CategoryId { get; set; }
        public bool IsPublished { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public List<CreateNewsImageDTO> Images { get; set; } = new List<CreateNewsImageDTO>();
    }

    public class CreateNewsImageDTO
    {
        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public int DisplayOrder { get; set; } = 0;
    }

    public class UpdateNewsDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string Content { get; set; } = string.Empty;
        public string? ThumbnailUrl { get; set; }
        public string? Slug { get; set; }
        public int? CategoryId { get; set; }
        public bool IsPublished { get; set; }
        public bool IsFeatured { get; set; }
        public List<CreateNewsImageDTO> Images { get; set; } = new List<CreateNewsImageDTO>();
    }

    public class PublishNewsDTO
    {
        public DateTime? PublishedDate { get; set; }
    }

    public class NewsFilterDTO
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Keyword { get; set; }
        public int? CategoryId { get; set; }
        public bool? IsPublished { get; set; }
        public bool? IsFeatured { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? SortBy { get; set; } = "CreatedDate";
        public string? SortOrder { get; set; } = "desc";
    }
}
