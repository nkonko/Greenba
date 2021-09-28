﻿using Domain.Entities.Email;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Bussines
{
    public class SendGridEmailSender : IEmailSender
    {
        public SendGridEmailSender(
            IOptions<SendGridEmailSenderOptions> options
            )
        {
            this.Options = options.Value;
        }

        public SendGridEmailSenderOptions Options { get; set; }

        public async Task SendEmailAsync(
            string email,
            string subject,
            string message)
        {
            await Execute(Options.ApiKey, subject, message, email);
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

            // disable tracking settings
            // ref.: https://sendgrid.com/docs/User_Guide/Settings/tracking.html
            msg.SetClickTracking(false, false);
            msg.SetOpenTracking(false);
            msg.SetGoogleAnalytics(false);
            msg.SetSubscriptionTracking(false);

            return await client.SendEmailAsync(msg);
        }
    }
}