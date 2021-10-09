using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public Address Address { get; set; }

        public bool Active { get; set; }

        //public string FileName { get; set; }

        //public string PictureUrl { get; set; }
    }
}
