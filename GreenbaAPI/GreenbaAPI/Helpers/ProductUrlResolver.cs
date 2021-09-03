using System.Linq;
using AutoMapper;
using Domain;
using GreenbaAPI.Dtos;
using Microsoft.Extensions.Configuration;

namespace GreenbaAPI.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration config;

        public ProductUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Photos.FirstOrDefault(x => x.IsMain);

            if (photo != null)
            {
                return config["ApiUrl"] + photo.PictureUrl;
            }

            return config["ApiUrl"] + "images/products/placeholder.png";
        }
    }
}
