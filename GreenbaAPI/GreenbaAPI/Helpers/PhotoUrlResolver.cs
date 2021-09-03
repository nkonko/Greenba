using AutoMapper;
using Domain.Entities;
using GreenbaAPI.Dtos;
using Microsoft.Extensions.Configuration;

namespace GreenbaAPI.Helpers
{
    public class PhotoUrlResolver : IValueResolver<Photo, PhotoDto, string>
    {
        private readonly IConfiguration config;

        public PhotoUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(Photo source, PhotoDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
