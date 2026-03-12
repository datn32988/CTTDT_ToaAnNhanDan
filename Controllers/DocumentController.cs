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
    public class DocumentController : ControllerBase
    {
        private readonly AppDBContext _context;
        private readonly ILogger<DocumentController> _logger;

        public DocumentController(AppDBContext context, ILogger<DocumentController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDocuments([FromQuery] DocumentFilterDTO filter)
        {
            try
            {
                var query = _context.Documents
                    .Include(d => d.DocumentType)
                    .Include(d => d.Author)
                    .AsQueryable();

                // Apply filters
                if (!string.IsNullOrEmpty(filter.Keyword))
                {
                    query = query.Where(d => d.Title.Contains(filter.Keyword) ||
                                           (d.Summary != null && d.Summary.Contains(filter.Keyword)) ||
                                           (d.DocumentNumber != null && d.DocumentNumber.Contains(filter.Keyword)) ||
                                           (d.IssuingBody != null && d.IssuingBody.Contains(filter.Keyword)));
                }

                if (filter.DocumentTypeId.HasValue)
                {
                    query = query.Where(d => d.DocumentTypeId == filter.DocumentTypeId.Value);
                }

                if (filter.IsPublished.HasValue)
                {
                    query = query.Where(d => d.IsPublished == filter.IsPublished.Value);
                }
                else
                {
                    // By default, only show published documents for public users
                    if (!User.Identity?.IsAuthenticated ?? true)
                    {
                        query = query.Where(d => d.IsPublished);
                    }
                }

                if (filter.IsFeatured == true)
                {
                    query = query.Where(d => d.IsFeatured);
                }

                if (filter.StartDate.HasValue)
                {
                    query = query.Where(d => d.CreatedDate >= filter.StartDate.Value);
                }

                if (filter.EndDate.HasValue)
                {
                    query = query.Where(d => d.CreatedDate <= filter.EndDate.Value);
                }

                // Apply sorting
                query = filter.SortBy?.ToLower() switch
                {
                    "title" => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(d => d.Title) : query.OrderByDescending(d => d.Title),
                    "issuedate" => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(d => d.IssueDate) : query.OrderByDescending(d => d.IssueDate),
                    "viewcount" => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(d => d.ViewCount) : query.OrderByDescending(d => d.ViewCount),
                    _ => filter.SortOrder?.ToLower() == "asc" ? query.OrderBy(d => d.CreatedDate) : query.OrderByDescending(d => d.CreatedDate)
                };

                var totalItems = await query.CountAsync();
                var totalPages = (int)Math.Ceiling((double)totalItems / filter.PageSize);
                var page = Math.Max(1, Math.Min(filter.Page, totalPages));

                var documents = await query
                    .Skip((page - 1) * filter.PageSize)
                    .Take(filter.PageSize)
                    .Select(d => new DocumentDTO
                    {
                        Id = d.Id,
                        Title = d.Title,
                        Summary = d.Summary,
                        FileUrl = d.FileUrl,
                        FileName = d.FileName,
                        FileType = d.FileType,
                        FileSize = d.FileSize,
                        DocumentNumber = d.DocumentNumber,
                        IssueDate = d.IssueDate,
                        EffectiveDate = d.EffectiveDate,
                        IssuingBody = d.IssuingBody,
                        Signer = d.Signer,
                        DocumentTypeId = d.DocumentTypeId,
                        DocumentTypeName = d.DocumentType.Name,
                        DocumentTypeIcon = d.DocumentType.Icon,
                        AuthorId = d.AuthorId,
                        AuthorName = d.Author != null ? $"{d.Author.FirstName} {d.Author.LastName}" : null,
                        IsPublished = d.IsPublished,
                        IsFeatured = d.IsFeatured,
                        ViewCount = d.ViewCount,
                        CreatedDate = d.CreatedDate,
                        UpdatedDate = d.UpdatedDate,
                        PublishedDate = d.PublishedDate
                    })
                    .ToListAsync();

                var pagedResult = new PagedResult<DocumentDTO>
                {
                    Data = documents,
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
                _logger.LogError(ex, "Error getting documents");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentById(int id)
        {
            try
            {
                var document = await _context.Documents
                    .Include(d => d.DocumentType)
                    .Include(d => d.Author)
                    .FirstOrDefaultAsync(d => d.Id == id);

                if (document == null)
                    return NotFound();

                // Check if document is published or user is authenticated
                if (!document.IsPublished && (!User.Identity?.IsAuthenticated ?? true))
                {
                    return Unauthorized();
                }

                // Increment view count
                document.ViewCount++;
                await _context.SaveChangesAsync();

                var documentDto = new DocumentDTO
                {
                    Id = document.Id,
                    Title = document.Title,
                    Summary = document.Summary,
                    Content = document.Content,
                    FileUrl = document.FileUrl,
                    FileName = document.FileName,
                    FileType = document.FileType,
                    FileSize = document.FileSize,
                    DocumentNumber = document.DocumentNumber,
                    IssueDate = document.IssueDate,
                    EffectiveDate = document.EffectiveDate,
                    IssuingBody = document.IssuingBody,
                    Signer = document.Signer,
                    DocumentTypeId = document.DocumentTypeId,
                    DocumentTypeName = document.DocumentType.Name,
                    DocumentTypeIcon = document.DocumentType.Icon,
                    AuthorId = document.AuthorId,
                    AuthorName = document.Author != null ? $"{document.Author.FirstName} {document.Author.LastName}" : null,
                    IsPublished = document.IsPublished,
                    IsFeatured = document.IsFeatured,
                    ViewCount = document.ViewCount,
                    CreatedDate = document.CreatedDate,
                    UpdatedDate = document.UpdatedDate,
                    PublishedDate = document.PublishedDate
                };

                return Ok(documentDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting document by id");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> CreateDocument(CreateDocumentDTO dto)
        {
            try
            {
                if (!User.Identity?.IsAuthenticated ?? true)
                {
                    return Unauthorized(new { message = "User not authenticated" });
                }

                if (string.IsNullOrWhiteSpace(dto.Title))
                {
                    return BadRequest(new { message = "Title is required" });
                }

                // Verify document type exists
                var documentType = await _context.DocumentTypes.FindAsync(dto.DocumentTypeId);
                if (documentType == null || !documentType.IsActive)
                    return BadRequest(new { message = "Invalid document type" });

                var document = new Document
                {
                    Title = dto.Title,
                    Summary = dto.Summary,
                    Content = dto.Content,
                    FileUrl = dto.FileUrl,
                    FileName = dto.FileName,
                    FileType = dto.FileType,
                    FileSize = dto.FileSize,
                    DocumentNumber = dto.DocumentNumber,
                    IssueDate = dto.IssueDate,
                    EffectiveDate = dto.EffectiveDate,
                    IssuingBody = dto.IssuingBody,
                    Signer = dto.Signer,
                    DocumentTypeId = dto.DocumentTypeId,
                    AuthorId = GetCurrentUserId(),
                    IsPublished = dto.IsPublished,
                    IsFeatured = dto.IsFeatured,
                    PublishedDate = dto.IsPublished ? DateTime.Now : null
                };

                _context.Documents.Add(document);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    document = new DocumentDTO
                    {
                        Id = document.Id,
                        Title = document.Title,
                        Summary = document.Summary,
                        FileUrl = document.FileUrl,
                        FileName = document.FileName,
                        FileType = document.FileType,
                        FileSize = document.FileSize,
                        DocumentNumber = document.DocumentNumber,
                        IssueDate = document.IssueDate,
                        EffectiveDate = document.EffectiveDate,
                        IssuingBody = document.IssuingBody,
                        Signer = document.Signer,
                        DocumentTypeId = document.DocumentTypeId,
                        DocumentTypeName = documentType.Name,
                        DocumentTypeIcon = documentType.Icon,
                        AuthorId = document.AuthorId,
                        IsPublished = document.IsPublished,
                        IsFeatured = document.IsFeatured,
                        ViewCount = document.ViewCount,
                        CreatedDate = document.CreatedDate,
                        UpdatedDate = document.UpdatedDate,
                        PublishedDate = document.PublishedDate
                    },
                    message = "Document created successfully"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating document");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Editor")]
        public async Task<IActionResult> UpdateDocument(int id, UpdateDocumentDTO dto)
        {
            try
            {
                var document = await _context.Documents.FindAsync(id);
                if (document == null)
                    return NotFound();

                // Check if user can edit this document
                if (User.IsInRole("Editor") && document.AuthorId != GetCurrentUserId())
                {
                    return Forbid();
                }

                // Verify document type exists
                var documentType = await _context.DocumentTypes.FindAsync(dto.DocumentTypeId);
                if (documentType == null || !documentType.IsActive)
                    return BadRequest(new { message = "Invalid document type" });

                document.Title = dto.Title;
                document.Summary = dto.Summary;
                document.Content = dto.Content;
                document.FileUrl = dto.FileUrl;
                document.FileName = dto.FileName;
                document.FileType = dto.FileType;
                document.FileSize = dto.FileSize;
                document.DocumentNumber = dto.DocumentNumber;
                document.IssueDate = dto.IssueDate;
                document.EffectiveDate = dto.EffectiveDate;
                document.IssuingBody = dto.IssuingBody;
                document.Signer = dto.Signer;
                document.DocumentTypeId = dto.DocumentTypeId;
                document.IsPublished = dto.IsPublished;
                document.IsFeatured = dto.IsFeatured;
                document.UpdatedDate = DateTime.Now;

                if (dto.IsPublished && !document.PublishedDate.HasValue)
                {
                    document.PublishedDate = DateTime.Now;
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Document updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating document");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            try
            {
                var document = await _context.Documents.FindAsync(id);
                if (document == null)
                    return NotFound();

                _context.Documents.Remove(document);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting document");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("{id}/publish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PublishDocument(int id, PublishDocumentDTO dto)
        {
            try
            {
                var document = await _context.Documents.FindAsync(id);
                if (document == null)
                    return NotFound();

                document.IsPublished = true;
                document.PublishedDate = dto.PublishedDate ?? DateTime.Now;
                document.UpdatedDate = DateTime.Now;

                await _context.SaveChangesAsync();

                return Ok(new { message = "Document published successfully", publishedDate = document.PublishedDate });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error publishing document");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedDocuments()
        {
            try
            {
                var featuredDocuments = await _context.Documents
                    .Include(d => d.DocumentType)
                    .Where(d => d.IsFeatured && d.IsPublished)
                    .OrderByDescending(d => d.PublishedDate)
                    .Take(10)
                    .Select(d => new DocumentDTO
                    {
                        Id = d.Id,
                        Title = d.Title,
                        Summary = d.Summary,
                        FileUrl = d.FileUrl,
                        FileName = d.FileName,
                        FileType = d.FileType,
                        FileSize = d.FileSize,
                        DocumentNumber = d.DocumentNumber,
                        IssueDate = d.IssueDate,
                        EffectiveDate = d.EffectiveDate,
                        IssuingBody = d.IssuingBody,
                        Signer = d.Signer,
                        DocumentTypeId = d.DocumentTypeId,
                        DocumentTypeName = d.DocumentType.Name,
                        DocumentTypeIcon = d.DocumentType.Icon,
                        IsPublished = d.IsPublished,
                        IsFeatured = d.IsFeatured,
                        ViewCount = d.ViewCount,
                        CreatedDate = d.CreatedDate,
                        PublishedDate = d.PublishedDate
                    })
                    .ToListAsync();

                return Ok(featuredDocuments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting featured documents");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            return userIdClaim != null && int.TryParse(userIdClaim.Value, out var userId) ? userId : null;
        }
    }
}
