using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _context;

        // Injection then its given a lifetime
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts() => Ok(await _context.Products.ToListAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id) => Ok(await _context.Products.FindAsync(id));
    }
}