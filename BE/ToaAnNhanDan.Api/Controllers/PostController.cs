using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToaAnNhanDan.Api.Dtos.Post;
using ToaAnNhanDan.Api.Helpers;
using ToaAnNhanDan.Api.Models;
using ToaAnNhanDan.Api.Services;

namespace ToaAnNhanDan.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController(IPostService post, IWebHostEnvironment env) : ControllerBase
    {
        [HttpPost]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostFormDto dto, CancellationToken ct)
        {
            var authorId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(authorId))
                return Unauthorized(new { message = "Missing user id" });

            if (dto.Files.Count > 0 && dto.MediaTypes is not null && dto.MediaTypes.Count is not 1 && dto.MediaTypes.Count != dto.Files.Count)
                return BadRequest(new { message = "MediaTypes phải để trống, hoặc 1 giá trị cho tất cả file, hoặc cùng số lượng với Files." });

            var media = new List<CreatePostMediaDto>();

            for (var i = 0; i < dto.Files.Count; i++)
            {
                var file = dto.Files[i];
                var url = await MediaStorageHelper.SavePostMediaAsync(file, env, ct);
                var orderIndex = dto.OrderIndexes is not null && i < dto.OrderIndexes.Count ? dto.OrderIndexes[i] : i;
                var isThumbnail = dto.IsThumbnails is not null && i < dto.IsThumbnails.Count
                    ? (bool?)dto.IsThumbnails[i]
                    : null;
                var mediaType = dto.MediaTypes switch
                {
                    null or { Count: 0 } => MediaType.Image,
                    { Count: 1 } => dto.MediaTypes[0],
                    _ => dto.MediaTypes![i]
                };

                media.Add(new CreatePostMediaDto
                {
                    Url = url,
                    MediaType = mediaType,
                    OrderIndex = orderIndex,
                    IsThumbnail = isThumbnail
                });
            }

            var createDto = new CreatePostDto
            {
                CategoryId = dto.CategoryId,
                Title = dto.Title,
                Content = dto.Content,
                CreatedAt = dto.CreatedAt,
                Media = media.Count > 0 ? media : null
            };

            var created = await post.CreateAsync(createDto, authorId, ct);
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
