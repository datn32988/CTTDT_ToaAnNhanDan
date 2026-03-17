using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToaAnNhanDan.Api.Dtos.Post;
using ToaAnNhanDan.Api.Helpers;

namespace ToaAnNhanDan.Api.Controllers
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController(IWebHostEnvironment env) : ControllerBase
    {
        [HttpPost("post-media")]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadPostMedia([FromForm] UploadMediaDto dto, CancellationToken ct)
        {
            if (dto is null || dto.File.Length == 0)
                return BadRequest(new { message = "File is required" });

            var url = await MediaStorageHelper.SavePostMediaAsync(dto.File, env, ct);
            return Ok(new { url });
        }
    }
}
