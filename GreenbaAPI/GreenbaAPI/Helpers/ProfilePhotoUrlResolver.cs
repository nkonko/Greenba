using AutoMapper;
using Domain.Entities;
using GreenbaAPI.Dtos;
using Microsoft.Extensions.Configuration;

namespace GreenbaAPI.Helpers
{
    //public class ProfilePhotoUrlResolver : IValueResolver<UserPhoto, ProfilePhotoDto, string>
    //{
    //    private readonly IConfiguration config;

    //    public ProfilePhotoUrlResolver(IConfiguration config)
    //    {
    //        this.config = config;
    //    }

    //    public string Resolve(UserPhoto source, ProfilePhotoDto destination, string destMember, ResolutionContext context)
    //    {
    //        if (!string.IsNullOrEmpty(source.PictureUrl))
    //        {
    //            return config["ApiUrl"] + source.PictureUrl;
    //        }

    //        return null;
    //    }
    //}
}
