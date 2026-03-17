namespace ToaAnNhanDan.Api.Dtos.Post
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? ParentId { get; set; }
        public int ChildrenCount { get; set; }
    }
}
