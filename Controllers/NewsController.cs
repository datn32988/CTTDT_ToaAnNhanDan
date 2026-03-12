using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalWeb.Data;
using PortalWeb.DTOs;
using PortalWeb.Models;
using System.Security.Claims;

namespace PortalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly ILogger<NewsController> _logger;
        private readonly IWebHostEnvironment _env;

        public NewsController(AppDBContext context, ILogger<NewsController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllNews([FromQuery] NewsFilterDTO filter)
        {
            try
            {
                var query = _context.News
                    .Include(n => n.Category)
                    .Include(n => n.Images.OrderBy(i => i.DisplayOrder))
                    .AsQueryable();

                // Apply filters
                if (!string.IsNullOrEmpty(filter.Keyword))
                {
                    query = query.Where(n => n.Title.Contains(filter.Keyword) ||
                                           n.Summary!.Contains(filter.Keyword));
                }

                if (filter.CategoryId.HasValue)
                {
                    query = query.Where(n => n.CategoryId == filter.CategoryId.Value);
                }

                if (filter.IsPublished.HasValue)
                {
                    query = query.Where(n => n.IsPublished == filter.IsPublished.Value);
                }
                else
                {
                    // By default, only show published news for public users
                    if (!User.Identity?.IsAuthenticated ?? true)
                    {
                        query = query.Where(n => n.IsPublished);
                    }
                }

                if (filter.IsFeatured == true)
                {
                    query = query.Where(n => n.IsFeatured);
                }

                if (filter.StartDate.HasValue)
                {
                    query = query.Where(n => n.CreatedDate >= filter.StartDate.Value);
                }

                if (filter.EndDate.HasValue)
                {
                    query = query.Where(n => n.CreatedDate <= filter.EndDate.Value);
                }

                // Apply sorting
                query = filter.SortBy?.ToLower() switch
                {
                    "title" => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(n => n.Title) : query.OrderByDescending(n => n.Title),
                    "viewcount" => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(n => n.ViewCount) : query.OrderByDescending(n => n.ViewCount),
                    _ => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(n => n.CreatedDate) : query.OrderByDescending(n => n.CreatedDate)
                };

                var totalItems = await query.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalItems / filter.PageSize);
                var page = Math.Max(1, Math.Min(filter.Page, totalPages));

                var news = await query
                    .Skip((page - 1) * filter.PageSize)
                    .Take(filter.PageSize)
                    .Select(n => new NewsDTO
                    {
                        Id = n.Id,
                        Title = n.Title,
                        Summary = n.Summary,
                        Content = n.Content,
                        ThumbnailUrl = n.ThumbnailUrl,
                        Slug = n.Slug,
                        CategoryId = n.CategoryId,
                        CategoryName = n.Category != null ? n.Category.Name : null,
                        AuthorId = n.AuthorId,
                        AuthorName = n.Author,
                        IsPublished = n.IsPublished,
                        IsFeatured = n.IsFeatured,
                        ViewCount = n.ViewCount,
                        CreatedDate = n.CreatedDate,
                        UpdatedDate = n.UpdatedDate,
                        PublishedDate = n.PublishedDate,
                        Images = n.Images.Select(i => new NewsImageDTO
                        {
                            Id = i.Id,
                            ImageUrl = i.ImageUrl,
                            Caption = i.Caption,
                            DisplayOrder = i.DisplayOrder,
                            CreatedDate = i.CreatedDate
                        }).ToList()
                    })
                    .ToListAsync();

                var pagedResult = new PagedResult<NewsDTO>
                {
                    Data = news,
                    Page = page,
                    PageSize = filter.PageSize,
                    TotalItems = totalItems,
                    TotalPages = totalPages,
                    HasNextPage = page < totalPages,
                    HasPreviousPage = page > 1
                };

                return Ok(pagedResult);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNewsById(int id)
        {
            try
            {
                var news = await _context.News
                    .Include(n => n.Category)
                    .Include(n => n.Images.OrderBy(i => i.DisplayOrder))
                    .FirstOrDefaultAsync(n => n.Id == id);

                if (news == null)
                    return NotFound();

                // Check if news is published or user is authenticated
                if (!news.IsPublished && (!User.Identity?.IsAuthenticated ?? true))
                {
                    return Unauthorized();
                }

                // Increment view count
                news.ViewCount++;
                await _context.SaveChangesAsync();

                var newsDto = new NewsDTO
                {
                    Id = news.Id,
                    Title = news.Title,
                    Summary = news.Summary,
                    Content = news.Content,
                    ThumbnailUrl = news.ThumbnailUrl,
                    Slug = news.Slug,
                    CategoryId = news.CategoryId,
                    CategoryName = news.Category?.Name,
                    AuthorId = news.AuthorId,
                    AuthorName = news.Author,
                    IsPublished = news.IsPublished,
                    IsFeatured = news.IsFeatured,
                    ViewCount = news.ViewCount,
                    CreatedDate = news.CreatedDate,
                    UpdatedDate = news.UpdatedDate,
                    PublishedDate = news.PublishedDate,
                    Images = news.Images.Select(i => new NewsImageDTO
                    {
                        Id = i.Id,
                        ImageUrl = i.ImageUrl,
                        Caption = i.Caption,
                        DisplayOrder = i.DisplayOrder,
                        CreatedDate = i.CreatedDate
                    }).ToList()
                };

                return Ok(newsDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting news by id");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> CreateNews(CreateNewsDTO dto)
        {
            try
            {
                if (!User.Identity?.IsAuthenticated ?? true)
                {
                    return Unauthorized(new { message = "User not authenticated" });
                }

                if (string.IsNullOrWhiteSpace(dto.Title) || string.IsNullOrWhiteSpace(dto.Content))
                {
                    return BadRequest(new { message = "Title and Content are required" });
                }

                // Verify category exists if provided
                if (dto.CategoryId.HasValue)
                {
                    var category = await _context.Categories.FindAsync(dto.CategoryId.Value);
                    if (category == null || !category.IsActive)
                        return BadRequest(new { message = "Invalid category" });
                }

                var news = new News
                {
                    Title = dto.Title,
                    Summary = dto.Summary,
                    Content = dto.Content,
                    ThumbnailUrl = dto.ThumbnailUrl,
                    Slug = !string.IsNullOrEmpty(dto.Slug) ? dto.Slug : GenerateSlug(dto.Title),
                    CategoryId = dto.CategoryId,
                    AuthorId = GetCurrentUserId(),
                    Author = User.Identity?.Name,
                    IsPublished = dto.IsPublished,
                    IsFeatured = dto.IsFeatured,
                    PublishedDate = dto.IsPublished ? DateTime.Now : null
                };

                _context.News.Add(news);
                await _context.SaveChangesAsync();

                // Add images if provided
                if (dto.Images != null && dto.Images.Any())
                {
                    foreach (var imageDto in dto.Images)
                    {
                        var newsImage = new NewsImage
                        {
                            NewsId = news.Id,
                            ImageUrl = imageDto.ImageUrl,
                            Caption = imageDto.Caption,
                            DisplayOrder = imageDto.DisplayOrder
                        };
                        _context.NewsImages.Add(newsImage);
                    }
                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    news = new NewsDTO
                    {
                        Id = news.Id,
                        Title = news.Title,
                        Summary = news.Summary,
                        Content = news.Content,
                        ThumbnailUrl = news.ThumbnailUrl,
                        Slug = news.Slug,
                        CategoryId = news.CategoryId,
                        IsPublished = news.IsPublished,
                        IsFeatured = news.IsFeatured,
                        ViewCount = news.ViewCount,
                        CreatedDate = news.CreatedDate,
                        UpdatedDate = news.UpdatedDate,
                        PublishedDate = news.PublishedDate,
                        Images = news.Images.Select(i => new NewsImageDTO
                        {
                            Id = i.Id,
                            ImageUrl = i.ImageUrl,
                            Caption = i.Caption,
                            DisplayOrder = i.DisplayOrder,
                            CreatedDate = i.CreatedDate
                        }).ToList()
                    },
                    message = "News created successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> UpdateNews(int id, UpdateNewsDTO dto)
        {
            try
            {
                var news = await _context.News
                    .Include(n => n.Images)
                    .FirstOrDefaultAsync(n => n.Id == id);

                if (news == null)
                    return NotFound();

                // Check if user can edit this news
                if (User.IsInRole("Editor") && news.AuthorId != GetCurrentUserId())
                {
                    return Forbid();
                }

                // Update news properties
                news.Title = dto.Title;
                news.Summary = dto.Summary;
                news.Content = dto.Content;
                news.ThumbnailUrl = dto.ThumbnailUrl;
                news.Slug = dto.Slug;
                news.CategoryId = dto.CategoryId;
                news.IsPublished = dto.IsPublished;
                news.IsFeatured = dto.IsFeatured;
                news.UpdatedDate = DateTime.Now;

                if (dto.IsPublished && !news.PublishedDate.HasValue)
                {
                    news.PublishedDate = DateTime.Now;
                }

                // Update images - remove existing and add new
                var existingImages = news.Images.ToList();
                _context.NewsImages.RemoveRange(existingImages);

                if (dto.Images != null && dto.Images.Any())
                {
                    foreach (var imageDto in dto.Images)
                    {
                        var newsImage = new NewsImage
                        {
                            NewsId = news.Id,
                            ImageUrl = imageDto.ImageUrl,
                            Caption = imageDto.Caption,
                            DisplayOrder = imageDto.DisplayOrder
                        };
                        _context.NewsImages.Add(newsImage);
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "News updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            try
            {
                var news = await _context.News.FindAsync(id);
                if (news == null)
                    return NotFound();

                _context.News.Remove(news);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("{id}/publish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PublishNews(int id, PublishNewsDTO dto)
        {
            try
            {
                var news = await _context.News.FindAsync(id);
                if (news == null)
                    return NotFound();

                news.IsPublished = true;
                news.PublishedDate = dto.PublishedDate ?? DateTime.Now;
                news.UpdatedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { message = "News published successfully", publishedDate = news.PublishedDate });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error publishing news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedNews()
        {
            try
            {
                var featuredNews = await _context.News
                    .Include(n => n.Category)
                    .Include(n => n.Images.OrderBy(i => i.DisplayOrder))
                    .Where(n => n.IsFeatured && n.IsPublished)
                    .OrderByDescending(n => n.PublishedDate)
                    .Take(10)
                    .Select(n => new NewsDTO
                    {
                        Id = n.Id,
                        Title = n.Title,
                        Summary = n.Summary,
                        ThumbnailUrl = n.ThumbnailUrl,
                        Slug = n.Slug,
                        CategoryId = n.CategoryId,
                        CategoryName = n.Category != null ? n.Category.Name : null,
                        IsPublished = n.IsPublished,
                        IsFeatured = n.IsFeatured,
                        ViewCount = n.ViewCount,
                        CreatedDate = n.CreatedDate,
                        PublishedDate = n.PublishedDate,
                        Images = n.Images.Select(i => new NewsImageDTO
                        {
                            Id = i.Id,
                            ImageUrl = i.ImageUrl,
                            Caption = i.Caption,
                            DisplayOrder = i.DisplayOrder,
                            CreatedDate = i.CreatedDate
                        }).ToList()
                    })
                    .ToListAsync();

                return Ok(featuredNews);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting featured news");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private string GenerateSlug(string title)
        {
            return title.ToLower()
                .Replace(" ", "-")
                .Replace("&", "and")
                .Replace("?", "")
                .Replace("!", "")
                .Replace(".", "")
                .Replace(",", "")
                .Replace(";", "")
                .Replace(":", "")
                .Replace("'", "")
                .Replace("\"", "")
                .Replace("--", "-");
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId) ? userId : null;
        }
    }
}
