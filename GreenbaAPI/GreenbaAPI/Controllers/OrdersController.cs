using System.Collections.Generic;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Business.Interfaces;
using Domain.Entities.OrderAggregate;
using Domain.Specification;
using GreenbaAPI.Dtos;
using GreenbaAPI.Extensions;
using GreenbaAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Source.Repository.Interfaces;

namespace GreenbaAPI.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService orderService;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public OrdersController(IOrderService orderService, IMapper mapper, IUnitOfWork unitOfWork)
        {
            this.orderService = orderService;
            this.mapper = mapper;
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User?.RetriveEmailFromPrincipal();

            var address = mapper.Map<AddressDto, AddressOrder>(orderDto.ShipToAddress);

            var order = await orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId, address);

            if (order == null)
            {
                return BadRequest(new ApiResponse(400, "Problema en crear la orden"));
            }

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetriveEmailFromPrincipal();

            var orders = await orderService.GetOrdersForUserAsync(email);

            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("getorders")]
        public async Task<ActionResult<Pagination<OrderDto>>> GetOrders([FromQuery] OrderSpecParams orderparams)
        {
            var spec = new OrderSpecification(orderparams);

            var orders = await unitOfWork.Repository<Order>().ListAsync(spec);

            var countSpec = new OrdersFilterCountSpecification(orderparams);

            var totalItems = await unitOfWork.Repository<Order>().CountAsync(countSpec);

            var ordersResult = mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders);

            return Ok(new Pagination<OrderToReturnDto>(orderparams.PageIndex, orderparams.PageSize, totalItems, ordersResult));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetriveEmailFromPrincipal();

            var order = await orderService.GetOrderByIdAsync(id, email);

            if (order == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return mapper.Map<Order, OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethods")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderService.GetDeliveryMethodsAsync());
        }
    }
}
