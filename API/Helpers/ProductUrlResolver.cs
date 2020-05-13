using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
  // form - to - destination property to be
  public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
  {
    private readonly IConfiguration _config;
    public ProductUrlResolver(IConfiguration config)
    {
      _config = config;
    }

    public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
    {
        var test =_config["ApiUrl"] + source.PictureUrl;
        if (!string.IsNullOrEmpty(source.PictureUrl)) return _config["ApiUrl"] + source.PictureUrl;

        return null;
    }
  }
}