using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostDto dto, CancellationToken ct)
        {
            var created = await post.CreateAsync(dto, ct);
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
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId, [FromQuery] int page = 1, CancellationToken ct = default)
        {
            var result = await post.GetAllPostsAsync(categoryId, page, ct);
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
        public async Task<IActionResult> GetCategories(CancellationToken ct)
        {
            var result = await post.GetListCategoryAsync(ct);
            return Ok(result);
        }
    }
}
