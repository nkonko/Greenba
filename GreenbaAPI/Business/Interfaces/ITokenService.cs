using System.Threading.Tasks;
using Domain.Entities.Identity;

namespace Business.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);

        bool ValidateToken(string token, out string userName);
    }
}
