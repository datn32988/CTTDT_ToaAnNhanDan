using Microsoft.EntityFrameworkCore;
using PortalWeb.Models;
namespace PortalWeb.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<NewsImage> NewsImages { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // News relationships
            modelBuilder.Entity<News>()
                .HasOne(n => n.Category)
                .WithMany(c => c.News)
                .HasForeignKey(n => n.CategoryId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<News>()
                .HasOne(n => n.AuthorUser)
                .WithMany(u => u.NewsArticles)
                .HasForeignKey(n => n.AuthorId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<NewsImage>()
                .HasOne(ni => ni.News)
                .WithMany(n => n.Images)
                .HasForeignKey(ni => ni.NewsId)
                .OnDelete(DeleteBehavior.Cascade);

            // Document relationships
            modelBuilder.Entity<Document>()
                .HasOne(d => d.DocumentType)
                .WithMany(dt => dt.Documents)
                .HasForeignKey(d => d.DocumentTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Document>()
                .HasOne(d => d.Author)
                .WithMany(u => u.Documents)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.SetNull);

            // FIX: Seed data phải dùng giá trị DateTime cố định, KHÔNG dùng DateTime.Now
            // DateTime.Now không phải constant nên EF Core sẽ báo lỗi khi tạo/chạy migration
            var seedDate = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Unspecified);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@toaan.gov.vn",
                    Password = BCrypt.Net.BCrypt.HashPassword("123456"),
                    Role = UserRole.Admin,
                    FirstName = "System",
                    LastName = "Administrator",
                    IsActive = true,
                    CreatedDate = seedDate   // ✅ Fixed: dùng giá trị cố định
                }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Tin hoạt động", Description = "Các tin hoạt động của tòa án", Slug = "tin-hoat-dong", Icon = "fa-newspaper", DisplayOrder = 1, IsActive = true, CreatedDate = seedDate },
                new Category { Id = 2, Name = "Tin tức", Description = "Tin tức pháp luật", Slug = "tin-tuc", Icon = "fa-gavel", DisplayOrder = 2, IsActive = true, CreatedDate = seedDate },
                new Category { Id = 3, Name = "Sự kiện", Description = "Các sự kiện quan trọng", Slug = "su-kien", Icon = "fa-calendar", DisplayOrder = 3, IsActive = true, CreatedDate = seedDate },
                new Category { Id = 4, Name = "Thông báo", Description = "Thông báo tuyển dụng", Slug = "thong-bao", Icon = "fa-bullhorn", DisplayOrder = 4, IsActive = true, CreatedDate = seedDate }
            );

            modelBuilder.Entity<DocumentType>().HasData(
                new DocumentType { Id = 1, Name = "Công văn", Description = "Các công văn của tòa án", Icon = "fa-file-alt", DisplayOrder = 1, IsActive = true, CreatedDate = seedDate },
                new DocumentType { Id = 2, Name = "Thông báo", Description = "Các thông báo chính thức", Icon = "fa-bullhorn", DisplayOrder = 2, IsActive = true, CreatedDate = seedDate },
                new DocumentType { Id = 3, Name = "Nghị quyết", Description = "Các nghị quyết của tòa án", Icon = "fa-gavel", DisplayOrder = 3, IsActive = true, CreatedDate = seedDate },
                new DocumentType { Id = 4, Name = "Quyết định", Description = "Các quyết định của tòa án", Icon = "fa-clipboard", DisplayOrder = 4, IsActive = true, CreatedDate = seedDate },
                new DocumentType { Id = 5, Name = "Hướng dẫn", Description = "Các văn bản hướng dẫn", Icon = "fa-compass", DisplayOrder = 5, IsActive = true, CreatedDate = seedDate },
                new DocumentType { Id = 6, Name = "Biên bản", Description = "Các biên bản họp, làm việc", Icon = "fa-book", DisplayOrder = 6, IsActive = true, CreatedDate = seedDate }
            );
        }
    }
}