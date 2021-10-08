﻿using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Business.Interfaces;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace Business.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSender emailSender;
        private readonly IEmailBuilder emailBuilder;

        public EmailService(IEmailSender emailSender, IEmailBuilder emailBuilder)
        {
            this.emailSender = emailSender;
            this.emailBuilder = emailBuilder;
        }

        public async Task SendUserActivationEmail(string email)
        {
            var html = File.ReadAllText(Path.GetFullPath("Templates\\ActivateUser.html"));
            var replacements = new Dictionary<string, string>();
            replacements.Add("[Link]", "www.google.com");

            var template = emailBuilder.Build(html, replacements);

            await emailSender.SendEmailAsync(email, "Activate user", template);
        }
    }
}
