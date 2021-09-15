using GreenbaAPI.Helpers;
using Microsoft.AspNetCore.Http;

namespace GreenbaAPI.Dtos
{
    public class UserPhotoDto
    {
        [MaxFileSize(2 * 1024 * 1024)]
        [AllowedExtensions(new[] { ".jpg", ".png", ".jpeg" })]
        public IFormFile Photo { get; set; }
    }
}
