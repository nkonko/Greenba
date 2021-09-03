using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Source.Identity
{
    public static class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Nico",
                        Email = "nico@test.com",
                        UserName = "nico@test.com",
                        Address = new Address()
                        {
                            FirstName = "TestStreet",
                            LastName = "TestsStreet2",
                            Street = "TestsStreet2",
                            City = "Ciudad de Buenos Aires",
                            Province = "Buenos Aires",
                            CP = "1017"
                        }
                    }
                };

                var roles = new List<AppRole>
                {
                   new AppRole {Name= "Admin"},
                   new AppRole {Name= "Member"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(user, "Member");

                    if (user.Email == "admin@test.com")
                    {
                        await userManager.AddToRoleAsync(user, "Admin");
                    }
                }
            }
        }
    }
}
