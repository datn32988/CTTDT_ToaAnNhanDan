using Microsoft.AspNetCore.Identity;

namespace ToaAnNhanDan.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}
