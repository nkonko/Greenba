using Domain.Entities.OrderAggregate;

namespace Domain.Specification
{
    public class OrderSpecification : BaseSpecification<Order>
    {
        public OrderSpecification(OrderSpecParams orderParams) :
            base(x =>
            ((!orderParams.DateFrom.HasValue && !orderParams.DateTo.HasValue) ||
            (orderParams.DateFrom.HasValue && orderParams.DateTo.HasValue &&
            x.OrderDate >= orderParams.DateFrom.Value && x.OrderDate <= orderParams.DateTo.Value) ||
            (orderParams.DateFrom.HasValue && !orderParams.DateTo.HasValue &&
            x.OrderDate >= orderParams.DateFrom.Value) ||
            (!orderParams.DateFrom.HasValue && orderParams.DateTo.HasValue &&
            x.OrderDate <= orderParams.DateTo.Value)) 
            //(string.IsNullOrEmpty(orderParams.State) || x.Status.ToString().Contains(orderParams.State.ToLower())

            )
        {
            ApplyPaging(orderParams.PageSize * (orderParams.PageIndex - 1), orderParams.PageSize);
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);

            if (!string.IsNullOrEmpty(orderParams.Sort))
            {
                switch (orderParams.Sort)
                {
                    case "Oldest":
                        AddOrderBy(p => p.OrderDate);
                        break;
                    default:
                        AddOrderByDesc(p => p.OrderDate);
                        break;
                }
            }
        }
    }
}
