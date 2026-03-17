using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToaAnNhanDan.Api.Dtos.Post;
using ToaAnNhanDan.Api.Services;

namespace ToaAnNhanDan.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController(IPostService post) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto, CancellationToken ct)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(authorId))
                return Unauthorized(new { message = "Missing user id" });

            var created = await post.CreateAsync(dto, authorId, ct);
            return Created($"/api/posts/{created.Id}", new { created.Id });
        }

        [HttpPost("post-category")]
        [Authorize]
        public async Task<IActionResult> CreateCategory([FromBody] CreatePostCategory category, CancellationToken ct)
        {
            var created = await post.CreateCategory(category, ct);
            return Created($"/api/posts/post-category/{created.Id}", new { created.Id });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId, [FromQuery] int? rootCategoryId, [FromQuery] int page = 1, CancellationToken ct = default)
        {
            var result = await post.GetAllPostsAsync(categoryId, rootCategoryId, page, ct);
            return Ok(result);
        }

        [HttpGet("{postId:int}")]
        public async Task<IActionResult> GetDetail([FromRoute] int postId, CancellationToken ct)
        {
            var result = await post.GetDetailAsync(postId, ct);
            if (result is null) return NotFound();

            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories([FromQuery] int? parentId, CancellationToken ct)
        {
            var result = await post.GetListCategoryAsync(parentId, ct);
            return Ok(result);
        }

        [HttpGet("{postId:int}/comments")]
        public async Task<IActionResult> GetComments([FromRoute] int postId, CancellationToken ct)
        {
            var result = await post.GetCommentsAsync(postId, ct);
            return Ok(result);
        }

        [HttpPost("{postId:int}/comments")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateComment([FromRoute] int postId, [FromBody] CreateCommentDto dto, CancellationToken ct)
        {
            var created = await post.CreateCommentAsync(postId, dto, ct);
            return Created($"/api/posts/{postId}/comments/{created.Id}", created);
        }
    }
}
