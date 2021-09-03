using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;
using GreenbaAPI.Dtos;
using Microsoft.AspNetCore.Mvc;
using Source.Repository.Interfaces;

namespace GreenbaAPI.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository basketRepository;
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            this.basketRepository = basketRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetbasketById(string id)
        {
            var basket = await basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var customerBasket = mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

            var updatedBasket = await basketRepository.UpdateBasketAsync(customerBasket);

            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await basketRepository.DeleteBasketAsync(id);
        }
    }
}
