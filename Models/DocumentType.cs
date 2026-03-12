namespace PortalWeb.Models
{
    public class DocumentType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; } // Icon class for UI
        public int DisplayOrder { get; set; } = 0; // For ordering on homepage
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        
        // Navigation properties
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}
