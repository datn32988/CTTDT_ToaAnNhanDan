using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortalWeb.Data;
using PortalWeb.DTOs;
using PortalWeb.Models;

namespace PortalWeb.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(AppDBContext context, ILogger<CategoryController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Where(c => c.IsActive)
                    .OrderBy(c => c.DisplayOrder)
                    .ThenBy(c => c.Name)
                    .Select(c => new CategoryDTO
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Slug = c.Slug,
                        Icon = c.Icon,
                        DisplayOrder = c.DisplayOrder,
                        IsActive = c.IsActive,
                        CreatedDate = c.CreatedDate,
                        UpdatedDate = c.UpdatedDate,
                        NewsCount = _context.News.Count(n => n.CategoryId == c.Id && n.IsPublished)
                    })
                    .ToListAsync();

                return Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting categories");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            try
            {
                var category = await _context.Categories
                    .Where(c => c.Id == id && c.IsActive)
                    .Select(c => new CategoryDTO
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        Slug = c.Slug,
                        Icon = c.Icon,
                        DisplayOrder = c.DisplayOrder,
                        IsActive = c.IsActive,
                        CreatedDate = c.CreatedDate,
                        UpdatedDate = c.UpdatedDate,
                        NewsCount = _context.News.Count(n => n.CategoryId == c.Id && n.IsPublished)
                    })
                    .FirstOrDefaultAsync();

                if (category == null)
                    return NotFound();

                return Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting category by id");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateCategory(CreateCategoryDTO dto)
        {
            try
            {
                // Check if category name already exists
                var existingCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == dto.Name.ToLower());

                if (existingCategory != null)
                    return BadRequest(new { message = "Danh mục này đã tồn tại" });

                var category = new Category
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Slug = !string.IsNullOrEmpty(dto.Slug) ? dto.Slug : GenerateSlug(dto.Name),
                    Icon = dto.Icon,
                    DisplayOrder = dto.DisplayOrder,
                    IsActive = dto.IsActive
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                var result = new CategoryDTO
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    Slug = category.Slug,
                    Icon = category.Icon,
                    DisplayOrder = category.DisplayOrder,
                    IsActive = category.IsActive,
                    CreatedDate = category.CreatedDate,
                    UpdatedDate = category.UpdatedDate,
                    NewsCount = 0
                };

                return CreatedAtAction(
                    nameof(GetCategoryById),
                    new { id = category.Id },
                    new { category = result, message = "Tạo danh mục thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating category");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryDTO dto)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                    return NotFound();

                // Check if name conflicts with other categories
                var existingCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Id != id && c.Name.ToLower() == dto.Name.ToLower());

                if (existingCategory != null)
                    return BadRequest(new { message = "Danh mục này đã tồn tại" });

                category.Name = dto.Name;
                category.Description = dto.Description;
                category.Slug = !string.IsNullOrEmpty(dto.Slug) ? dto.Slug : GenerateSlug(dto.Name);
                category.Icon = dto.Icon;
                category.DisplayOrder = dto.DisplayOrder;
                category.IsActive = dto.IsActive;
                category.UpdatedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật danh mục thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating category");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                    return NotFound();

                // Check if there are news using this category
                var newsCount = await _context.News
                    .CountAsync(n => n.CategoryId == id);

                if (newsCount > 0)
                    return BadRequest(new { message = $"Không thể xóa danh mục này vì có {newsCount} tin tức đang sử dụng" });

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting category");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private string GenerateSlug(string name)
        {
            return name.ToLower()
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
    }
}
