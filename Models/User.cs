namespace PortalWeb.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Avatar { get; set; }
        public UserRole Role { get; set; } = UserRole.User;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? UpdatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        
        // Navigation properties
        public virtual ICollection<News> NewsArticles { get; set; } = new List<News>();
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
    }

    public enum UserRole
    {
        User = 0,
        Editor = 1,
        Admin = 2
    }
}
