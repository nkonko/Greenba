using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IEmailService
    {
        Task SendUserActivationEmail(string displayName, string email, string token);

        Task SendUserForgotPasswordEmail(string email, string displayName);
    }
}