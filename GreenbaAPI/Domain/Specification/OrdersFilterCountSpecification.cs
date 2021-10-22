using Domain.Entities.OrderAggregate;

namespace Domain.Specification
{
    public class OrdersFilterCountSpecification : BaseSpecification<Order>
    {
        public OrdersFilterCountSpecification(OrderSpecParams orderParams) :
            base(x =>
            ((!orderParams.DateFrom.HasValue && !orderParams.DateTo.HasValue) ||
            (orderParams.DateFrom.HasValue && orderParams.DateTo.HasValue &&
            x.OrderDate >= orderParams.DateFrom.Value && x.OrderDate <= orderParams.DateTo.Value) ||
            (orderParams.DateFrom.HasValue && !orderParams.DateTo.HasValue &&
            x.OrderDate >= orderParams.DateFrom.Value) ||
            (!orderParams.DateFrom.HasValue && orderParams.DateTo.HasValue &&
            x.OrderDate <= orderParams.DateTo.Value)) 
            //(string.IsNullOrEmpty(orderParams.State) || x.Status.ToString().Contains(orderParams.State.ToLower())
            //)
            )
        {
        }
    }
}
