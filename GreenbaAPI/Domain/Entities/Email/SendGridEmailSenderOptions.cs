﻿namespace Domain.Entities.Email
{
    public class SendGridEmailSenderOptions
    {
        public string ApiKey { get; set; }

        public string SenderEmail { get; set; }

        public string SenderName { get; set; }
    }
}
