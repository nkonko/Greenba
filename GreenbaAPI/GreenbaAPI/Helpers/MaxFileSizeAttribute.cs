﻿using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace GreenbaAPI.Helpers
{
    public class MaxFileSizeAttribute : ValidationAttribute
    {
        private readonly int maxFileSize;
        public MaxFileSizeAttribute(int maxFileSize)
        {
            this.maxFileSize = maxFileSize;
        }

        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                if (file.Length > maxFileSize)
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }

            return ValidationResult.Success;
        }

        private string GetErrorMessage()
        {
            return $"Maximum allowed file size is { maxFileSize } bytes.";
        }
    }
}
