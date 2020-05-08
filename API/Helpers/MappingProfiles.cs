using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
        CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s =>s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            // Custom resolver
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());
        CreateMap<Core.Entities.Identity.Address,AddressDto>().ReverseMap();
        CreateMap<CustomerBasketDto, CustomerBasket>();
        CreateMap<BasketItemDto, BasketItem>();
        // this is another address
        CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
        CreateMap<Order, OrderToReturnDto>()
        // d = delivery , o = options
          .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
          .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
        CreateMap<OrderItem, OrderItemDto>()
          .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrderd.ProductItemId))
          .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrderd.ProductName))
          .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrderd.PictureUrl))
          .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
    }
  }
}