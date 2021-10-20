using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Business.Interfaces;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Business.Services
{
    public class EmailService : IEmailService
    {
        private const string ActivateUserTemplate = "Templates\\ActivateUser.html";
        private const string ForgotPasswordTemplate = "Templates\\ForgotPassword.html";

        private readonly IEmailSender emailSender;
        private readonly IEmailBuilder emailBuilder;

        public EmailService(IEmailSender emailSender, IEmailBuilder emailBuilder)
        {
            this.emailSender = emailSender;
            this.emailBuilder = emailBuilder;
        }

        public async Task SendUserActivationEmail(string displayName, string email, string token)
        {
            var replacements = new Dictionary<string, string>();
            replacements.Add("[Link]", $"localhost:4200/#/account/validate?Token={token}");
            replacements.Add("[User]", displayName);

            var template = GetTemplate(File.ReadAllText(Path.GetFullPath(ActivateUserTemplate)), replacements);

            await emailSender.SendEmailAsync(email, "Activate user", template);
        }

        public async Task SendUserForgotPasswordEmail(string email)
        {
            var replacements = new Dictionary<string, string>();
            replacements.Add("[Link]", $"localhost:4200/#/account/confirmPassword");

            var template = GetTemplate(File.ReadAllText(Path.GetFullPath(ForgotPasswordTemplate)), replacements);

            await emailSender.SendEmailAsync(email, "Forgot password", template);
        }

        private string GetTemplate(string htmlFile, Dictionary<string, string> replacements)
        {
            return emailBuilder.Build(htmlFile, replacements);
        }
    }
}
