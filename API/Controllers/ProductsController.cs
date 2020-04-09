using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly IProductRepository _repo;

    public ProductsController(IProductRepository repo)
    {
      _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts() => Ok(await _repo.GetProductsAsync());

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id) => Ok(await _repo.GetProductByIdAsync(id));

    [HttpGet("brands")]
    public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands() => Ok(await _repo.GetProductBrandsAsync());

    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes() => Ok(await _repo.GetProductTypesAsync());
  }
}