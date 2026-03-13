namespace ToaAnNhanDan.Api.Dtos.Common
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = [];
        public Paging Paging { get; set; } = new();
    }
}