using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    // for this we needed to add the extesions identity stores package
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}