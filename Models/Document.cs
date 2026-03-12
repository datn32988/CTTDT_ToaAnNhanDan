namespace PortalWeb.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Summary { get; set; }
        public string? Content { get; set; } // Full content if needed
        public string? FileUrl { get; set; } // Path to uploaded file
        public string? FileName { get; set; } // Original file name
        public string? FileType { get; set; } // PDF, DOC, DOCX, etc.
        public long FileSize { get; set; } = 0; // File size in bytes
        public string? DocumentNumber { get; set; } // Số hiệu văn bản: 123/2024/TAND
        public DateTime? IssueDate { get; set; } // Ngày ban hành
        public DateTime? EffectiveDate { get; set; } // Ngày có hiệu lực
        public string? IssuingBody { get; set; } // Cơ quan ban hành
        public string? Signer { get; set; } // Người ký
        public int DocumentTypeId { get; set; }
        public int? AuthorId { get; set; } // User who uploaded
        public bool IsPublished { get; set; } = false;
        public bool IsFeatured { get; set; } = false;
        public int ViewCount { get; set; } = 0;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        public DateTime? PublishedDate { get; set; }
        
        // Navigation properties
        public virtual DocumentType DocumentType { get; set; } = null!;
        public virtual User? Author { get; set; }
    }
}
