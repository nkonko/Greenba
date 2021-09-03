using Domain.Entities.OrderAggregate;

namespace Domain.Specification
{
    public class OrdersItemsOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersItemsOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDesc(o => o.OrderDate);
        }

        public OrdersItemsOrderingSpecification(int id, string email) : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}
