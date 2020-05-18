using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basketRepo;
        private readonly IPaymentService _paymentService;
        public OrderService(
        IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
        // get basket from the repo
        var basket = await _basketRepo.GetBasketAsync(basketId);

        // get items from the product repo
        var items = new List<OrderItem>();

        foreach (var item in basket.Items)
        {
            var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
            // Create snapshot in time
            var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.Photos.FirstOrDefault(x => x.IsMain)?.PictureUrl);
            var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
            items.Add(orderItem);
        }
        // get delivery method from repo
        var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
        // calcluate the subtotal

        // Check if there is an existing order
        var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
        var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

        if (existingOrder != null)
        {
            _unitOfWork.Repository<Order>().Delete(existingOrder);
            // Just in case update the payment intent
            await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
        }

        var subtotal = items.Sum(items => items.Price * items.Quantity);
        // create order
        var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);

        _unitOfWork.Repository<Order>().Add(order);
        // Save to db
        // If anything failes all the changes will be rollbacked, and will send a error
        // So no partial updates anymore
        var result = await _unitOfWork.Complete();

        if (result <= 0) return null;

        // return the order
        return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
        return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
    }

    public async Task<Order> GetOrderbyIdAsync(int id, string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);
        return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
        var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

        return await _unitOfWork.Repository<Order>().ListAsync(spec);
    }
}
}