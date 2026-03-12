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
    public class DocumentTypeController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly ILogger<DocumentTypeController> _logger;

        public DocumentTypeController(AppDBContext context, ILogger<DocumentTypeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDocumentTypes()
        {
            try
            {
                var documentTypes = await _context.DocumentTypes
                    .Where(dt => dt.IsActive)
                    .OrderBy(dt => dt.DisplayOrder)
                    .ThenBy(dt => dt.Name)
                    .Select(dt => new DocumentTypeDTO
                    {
                        Id = dt.Id,
                        Name = dt.Name,
                        Description = dt.Description,
                        Icon = dt.Icon,
                        DisplayOrder = dt.DisplayOrder,
                        IsActive = dt.IsActive,
                        CreatedDate = dt.CreatedDate,
                        UpdatedDate = dt.UpdatedDate,
                        DocumentCount = _context.Documents.Count(d => d.DocumentTypeId == dt.Id && d.IsPublished)
                    })
                    .ToListAsync();

                return Ok(documentTypes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting document types");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentTypeById(int id)
        {
            try
            {
                var documentType = await _context.DocumentTypes
                    .Where(dt => dt.Id == id && dt.IsActive)
                    .Select(dt => new DocumentTypeDTO
                    {
                        Id = dt.Id,
                        Name = dt.Name,
                        Description = dt.Description,
                        Icon = dt.Icon,
                        DisplayOrder = dt.DisplayOrder,
                        IsActive = dt.IsActive,
                        CreatedDate = dt.CreatedDate,
                        UpdatedDate = dt.UpdatedDate,
                        DocumentCount = _context.Documents.Count(d => d.DocumentTypeId == dt.Id && d.IsPublished)
                    })
                    .FirstOrDefaultAsync();

                if (documentType == null)
                    return NotFound();

                return Ok(documentType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting document type by id");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateDocumentType(CreateDocumentTypeDTO dto)
        {
            try
            {
                // Check if document type name already exists
                var existingType = await _context.DocumentTypes
                    .FirstOrDefaultAsync(dt => dt.Name.ToLower() == dto.Name.ToLower());

                if (existingType != null)
                    return BadRequest(new { message = "Loại văn bản này đã tồn tại" });

                var documentType = new DocumentType
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Icon = dto.Icon,
                    DisplayOrder = dto.DisplayOrder,
                    IsActive = dto.IsActive
                };

                _context.DocumentTypes.Add(documentType);
                await _context.SaveChangesAsync();

                var result = new DocumentTypeDTO
                {
                    Id = documentType.Id,
                    Name = documentType.Name,
                    Description = documentType.Description,
                    Icon = documentType.Icon,
                    DisplayOrder = documentType.DisplayOrder,
                    IsActive = documentType.IsActive,
                    CreatedDate = documentType.CreatedDate,
                    UpdatedDate = documentType.UpdatedDate,
                    DocumentCount = 0
                };

                return CreatedAtAction(
                    nameof(GetDocumentTypeById),
                    new { id = documentType.Id },
                    new { documentType = result, message = "Tạo loại văn bản thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating document type");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDocumentType(int id, UpdateDocumentTypeDTO dto)
        {
            try
            {
                var documentType = await _context.DocumentTypes.FindAsync(id);
                if (documentType == null)
                    return NotFound();

                // Check if name conflicts with other types
                var existingType = await _context.DocumentTypes
                    .FirstOrDefaultAsync(dt => dt.Id != id && dt.Name.ToLower() == dto.Name.ToLower());

                if (existingType != null)
                    return BadRequest(new { message = "Loại văn bản này đã tồn tại" });

                documentType.Name = dto.Name;
                documentType.Description = dto.Description;
                documentType.Icon = dto.Icon;
                documentType.DisplayOrder = dto.DisplayOrder;
                documentType.IsActive = dto.IsActive;
                documentType.UpdatedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật loại văn bản thành công" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating document type");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDocumentType(int id)
        {
            try
            {
                var documentType = await _context.DocumentTypes.FindAsync(id);
                if (documentType == null)
                    return NotFound();

                // Check if there are documents using this type
                var documentCount = await _context.Documents
                    .CountAsync(d => d.DocumentTypeId == id);

                if (documentCount > 0)
                    return BadRequest(new { message = $"Không thể xóa loại văn bản này vì có {documentCount} văn bản đang sử dụng" });

                _context.DocumentTypes.Remove(documentType);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting document type");
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
