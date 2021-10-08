using Domain.Entities.Email;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Bussines
{
    public class SendGridEmailSender : IEmailSender
    {
        private readonly ILogger<SendGridEmailSender> logger;

        public SendGridEmailSender(IOptions<SendGridEmailSenderOptions> options, ILogger<SendGridEmailSender> logger)
        {
            Options = options.Value;
            this.logger = logger;
        }

        public SendGridEmailSenderOptions Options { get; set; }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var response = await Execute(Options.ApiKey, subject, message, email);

            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                logger.LogError(response.Body.ReadAsStringAsync().Result);
            }
        }

        private async Task<Response> Execute(
            string apiKey,
            string subject,
            string message,
            string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress(Options.SenderEmail, Options.SenderName),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            msg.AddTo(new EmailAddress(email));

            msg.SetClickTracking(false, false);
            msg.SetOpenTracking(false);
            msg.SetGoogleAnalytics(false);
            msg.SetSubscriptionTracking(false);

            return await client.SendEmailAsync(msg);
        }
    }
}