using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _mapper = mapper;
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            // if null then return a new customer basket
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
        {
            var updatedBasket = await _basketRepository.UpdateBasketAsync(_mapper.Map<CustomerBasket>(basket));
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
            return NoContent();
        }
    }
}