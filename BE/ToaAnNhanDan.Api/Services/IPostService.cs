using ToaAnNhanDan.Api.Dtos.Common;
using ToaAnNhanDan.Api.Dtos.Post;
using ToaAnNhanDan.Api.Models;

namespace ToaAnNhanDan.Api.Services
{
    public interface IPostService
    {
        Task<Post> CreateAsync(CreatePostDto dto, string authorId, CancellationToken ct = default);
        Task<PostCategory> CreateCategory(CreatePostCategory category, CancellationToken ct = default);
        Task<PagedResult<Post>> GetAllPostsAsync(int? categoryId = null, int page = 1, CancellationToken ct = default);
        Task<PostDetailDto?> GetDetailAsync(int postId, CancellationToken ct = default);
        Task<List<PostCategory>> GetListCategoryAsync(CancellationToken ct = default);
    }
}
