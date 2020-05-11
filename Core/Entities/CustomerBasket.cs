using System.Collections.Generic;

namespace Core.Entities
{
  public class CustomerBasket
  {
    // For redis so that it can create a basket without out (and ran into problems)
    public CustomerBasket()
    {
    }

    public CustomerBasket(string id)
    {
      Id = id;
    }

    public string Id { get; set; }
    public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    public int? DeliveryMethodId { get; set; }
    public string ClientSecret { get; set; }
    public string PaymentIntentId { get; set; }
    public decimal ShippingPrice { get; set; }
  }
}