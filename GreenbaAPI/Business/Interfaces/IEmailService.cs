using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IEmailService
    {
        Task SendUserActivationEmail(string email);
    }
}