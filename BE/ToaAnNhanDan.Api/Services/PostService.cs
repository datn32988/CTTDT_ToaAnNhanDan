using Microsoft.EntityFrameworkCore;
using ToaAnNhanDan.Api.Data;
using ToaAnNhanDan.Api.Dtos.Common;
using ToaAnNhanDan.Api.Dtos.Post;
using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Services
{
    public class PostService(ApplicationDbContext db) : IPostService
    {
        private const int PageSize = 10;

        public async Task<Post> CreateAsync(CreatePostDto dto, CancellationToken ct = default)
        {
            var post = new Post
            {
                IdCategory = dto.IdCategory,
                AuthorId = dto.AuthorId ?? string.Empty,
                Image = dto.Image ?? string.Empty,
                Title = dto.Title ?? string.Empty,
                Doc = dto.Doc ?? string.Empty,
                Date = dto.Date ?? DateTime.UtcNow
            };

            db.Posts.Add(post);
            await db.SaveChangesAsync(ct);

            return post;
        }

        public async Task<PostCategory> CreateCategory(CreatePostCategory category, CancellationToken ct = default)
        {
            var categoryEntity = new PostCategory
            {
                Name = category.Name.Trim()
            };

            db.PostCategories.Add(categoryEntity);
            await db.SaveChangesAsync(ct);
            return categoryEntity;
        }

        public async Task<PagedResult<Post>> GetAllPostsAsync(int? categoryId = null, int page = 1, CancellationToken ct = default)
        {
            if (page < 1) page = 1;

            var query = db.Posts.AsNoTracking();

            if (categoryId.HasValue)
                query = query.Where(p => p.IdCategory == categoryId.Value);

            var total = await query.CountAsync(ct);

            var items = await query
                .OrderByDescending(p => p.Date)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .ToListAsync(ct);

            var next = page * PageSize < total ? page + 1 : (int?)null;
            var prev = page > 1 ? page - 1 : (int?)null;

            return new PagedResult<Post>
            {
                Items = items,
                Paging = new Paging
                {
                    Page = page,
                    Next = next,
                    Prev = prev
                }
            };
        }
    }
}
