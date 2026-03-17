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

        public async Task<Post> CreateAsync(CreatePostDto dto, string authorId, CancellationToken ct = default)
        {
            var post = new Post
            {
                CategoryId = dto.CategoryId,
                Title = dto.Title ?? string.Empty,
                Content = dto.Content ?? string.Empty,
                CreatedAt = dto.CreatedAt ?? DateTime.UtcNow,
                AuthorId = authorId
            };

            AddMediaFromDto(post, dto.Media);

            db.Posts.Add(post);
            await db.SaveChangesAsync(ct);

            return post;
        }

        public async Task<PostCategory> CreateCategory(CreatePostCategory category, CancellationToken ct = default)
        {
            var categoryEntity = new PostCategory
            {
                Name = category.Name.Trim(),
                ParentId = category.ParentId
            };

            db.PostCategories.Add(categoryEntity);
            await db.SaveChangesAsync(ct);
            return categoryEntity;
        }

        public Task<PagedResult<PostListItemDto>> GetAllPostsAsync(int page = 1, CancellationToken ct = default)
        {
            return GetPostsInternalAsync(db.Posts.AsNoTracking(), page, ct);
        }

        public Task<PagedResult<PostListItemDto>> GetPostsByCategoryAsync(int categoryId, int page = 1, CancellationToken ct = default)
        {
            var query = db.Posts.AsNoTracking().Where(p => p.CategoryId == categoryId);
            return GetPostsInternalAsync(query, page, ct);
        }

        public async Task<PagedResult<PostListItemDto>> GetPostsByRootCategoryAsync(int rootCategoryId, int page = 1, CancellationToken ct = default)
        {
            var categoryIds = await GetCategoryTreeIdsAsync(rootCategoryId, ct);
            var query = db.Posts.AsNoTracking().Where(p => categoryIds.Contains(p.CategoryId));
            return await GetPostsInternalAsync(query, page, ct);
        }

        private async Task<PagedResult<PostListItemDto>> GetPostsInternalAsync(IQueryable<Post> query, int page, CancellationToken ct)
        {
            if (page < 1) page = 1;

            var total = await query.CountAsync(ct);

            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * PageSize)
                .Take(PageSize)
                .Select(p => new PostListItemDto
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    Title = p.Title,
                    CreatedAt = p.CreatedAt,
                    ThumbnailUrl = p.Media
                        .OrderByDescending(m => m.IsThumbnail == true)
                        .ThenBy(m => m.OrderIndex)
                        .Select(m => m.Url)
                        .FirstOrDefault(),
                    ThumbnailMediaType = p.Media
                        .OrderByDescending(m => m.IsThumbnail == true)
                        .ThenBy(m => m.OrderIndex)
                        .Select(m => (MediaType?)m.MediaType)
                        .FirstOrDefault()
                })
                .ToListAsync(ct);

            var next = page * PageSize < total ? page + 1 : (int?)null;
            var prev = page > 1 ? page - 1 : (int?)null;

            return new PagedResult<PostListItemDto>
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

        public async Task<PostDetailDto?> GetDetailAsync(int postId, CancellationToken ct = default)
        {
            return await db.Posts.AsNoTracking()
                .Where(p => p.Id == postId)
                .Select(p => new PostDetailDto
                {
                    Id = p.Id,
                    CategoryId = p.CategoryId,
                    Title = p.Title,
                    Content = p.Content,
                    CreatedAt = p.CreatedAt,
                    Media = p.Media
                        .OrderByDescending(m => m.IsThumbnail == true)
                        .ThenBy(m => m.OrderIndex)
                        .Select(m => new PostMediaDto
                        {
                            Id = m.Id,
                            Url = m.Url,
                            MediaType = m.MediaType,
                            OrderIndex = m.OrderIndex,
                            IsThumbnail = m.IsThumbnail
                        })
                        .ToList(),
                    Comments = p.Comments
                        .OrderByDescending(c => c.CreatedAt)
                        .Select(c => new CommentDto
                        {
                            Id = c.Id,
                            PostId = c.PostId,
                            Content = c.Content,
                            CreatedAt = c.CreatedAt,
                            AuthorName = c.AuthorName
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync(ct);
        }

        public Task<List<CategoryDto>> GetListCategoryAsync(int? parentId = null, CancellationToken ct = default)
        {
            var query = db.PostCategories.AsNoTracking();

            if (parentId.HasValue)
                query = query.Where(c => c.ParentId == parentId.Value);

            return query
                .OrderBy(c => c.Name)
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    ParentId = c.ParentId,
                    ChildrenCount = c.Children.Count
                })
                .ToListAsync(ct);
        }

        public async Task<CommentDto> CreateCommentAsync(int postId, CreateCommentDto dto, CancellationToken ct = default)
        {
            var exists = await db.Posts.AnyAsync(p => p.Id == postId, ct);
            if (!exists)
                throw new KeyNotFoundException("Post not found");

            var comment = new Comment
            {
                PostId = postId,
                Content = dto.Content.Trim(),
                AuthorName = dto.AuthorName.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            db.Comments.Add(comment);
            await db.SaveChangesAsync(ct);

            return new CommentDto
            {
                Id = comment.Id,
                PostId = comment.PostId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                AuthorName = comment.AuthorName
            };
        }

        public async Task<List<CommentDto>> GetCommentsAsync(int postId, CancellationToken ct = default)
        {
            return await db.Comments.AsNoTracking()
                .Where(c => c.PostId == postId)
                .OrderByDescending(c => c.CreatedAt)
                .Select(c => new CommentDto
                {
                    Id = c.Id,
                    PostId = c.PostId,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    AuthorName = c.AuthorName
                })
                .ToListAsync(ct);
        }

        private static void AddMediaFromDto(Post post, IEnumerable<CreatePostMediaDto>? media)
        {
            if (media is null)
                return;

            foreach (var item in media)
            {
                post.Media.Add(new PostMedia
                {
                    Url = item.Url,
                    MediaType = item.MediaType,
                    OrderIndex = item.OrderIndex,
                    IsThumbnail = item.IsThumbnail
                });
            }
        }

        private async Task<HashSet<int>> GetCategoryTreeIdsAsync(int rootCategoryId, CancellationToken ct)
        {
            var categories = await db.PostCategories.AsNoTracking()
                .Select(c => new { c.Id, c.ParentId })
                .ToListAsync(ct);

            var childrenLookup = categories
                .GroupBy(c => c.ParentId)
                .ToDictionary(g => g.Key, g => g.Select(x => x.Id).ToList());

            var result = new HashSet<int> { rootCategoryId };
            var stack = new Stack<int>();
            stack.Push(rootCategoryId);

            while (stack.Count > 0)
            {
                var current = stack.Pop();
                if (!childrenLookup.TryGetValue(current, out var children))
                    continue;

                foreach (var child in children)
                {
                    if (result.Add(child))
                        stack.Push(child);
                }
            }

            return result;
        }
    }
}
