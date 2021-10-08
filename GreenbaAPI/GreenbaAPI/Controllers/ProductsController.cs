using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Business.Interfaces;
using Domain;
using Domain.Specification;
using GreenbaAPI.Dtos;
using GreenbaAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Source.Repository.Interfaces;

namespace GreenbaAPI.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoService photoService;
        private readonly IMapper mapper;
        private readonly ILogger<ProductsController> logger;

        public ProductsController(IUnitOfWork unitOfWork, IPhotoService photoService, IMapper mapper, ILogger<ProductsController> logger)
        {
            this.unitOfWork = unitOfWork;
            this.photoService = photoService;
            this.mapper = mapper;
            this.logger = logger;
        }

        //[Cached(600)]
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductDto>>> GetProducts([FromQuery] ProductSpecParams productParams)
        {
            var spec = new ProductSpecification(productParams);

            var countSpec = new ProductFiltersCountSpecification(productParams);

            var totalItems = await unitOfWork.Repository<Product>().CountAsync(countSpec);

            var products = await unitOfWork.Repository<Product>().ListAsync(spec);

            var data = mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(products);

            return Ok(new Pagination<ProductDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }

        [Cached(600)]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            logger.LogInformation("Hello world");

            var spec = new ProductSpecification(id);

            var product = await unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return mapper.Map<Product, ProductDto>(product);
        }

        [Cached(600)]
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            return Ok(await unitOfWork.Repository<ProductBrand>().ListAllAsync());
        }

        [Cached(600)]
        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetTypes()
        {
            return Ok(await unitOfWork.Repository<ProductType>().ListAllAsync());
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductCreateDto createProduct)
        {
            var product = mapper.Map<ProductCreateDto, Product>(createProduct);

            unitOfWork.Repository<Product>().Add(product);

            var result = await unitOfWork.Complete();

            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problem creating product"));
            }

            return mapper.Map<Product, ProductDto>(product);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(int id, ProductCreateDto productUpdate)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);

            mapper.Map(productUpdate, product);

            unitOfWork.Repository<Product>().Update(product);

            var result = await unitOfWork.Complete();

            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problem updating product"));
            }

            return mapper.Map<Product, ProductDto>(product);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await unitOfWork.Repository<Product>().GetByIdAsync(id);

            foreach (var photo in product.Photos)
            {
                if (photo.Id > 18)
                {
                    photoService.DeleteFromDisk(photo);
                }
            }

            unitOfWork.Repository<Product>().Delete(product);

            var result = await unitOfWork.Complete();

            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problem deleting product"));
            }

            return Ok();
        }

        [HttpPut("{id}/photo")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductDto>> AddProductPhoto(int id, [FromForm] ProductPhotoDto photoDto)
        {
            var spec = new ProductSpecification(id);

            var product = await unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (photoDto.Photo.Length > 0)
            {
                var photo = await photoService.SaveToDiskAsync(photoDto.Photo);

                if (photo != null)
                {
                    product.AddPhoto(photo.PictureUrl, photo.FileName);

                    unitOfWork.Repository<Product>().Update(product);

                    var result = await unitOfWork.Complete();

                    if (result <= 0)
                    {
                        return BadRequest(new ApiResponse(400, "Problema al añadir foto"));
                    }
                }
                else
                {
                    return BadRequest(new ApiResponse(400, "problema guardando foto "));
                }
            }

            return mapper.Map<Product, ProductDto>(product);
        }

        [HttpDelete("{id}/photo/{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteProductPhoto(int id, int photoId)
        {
            var spec = new ProductSpecification(id);

            var product = await unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            var photo = product.Photos.SingleOrDefault(x => x.Id == photoId);

            if (photo != null)
            {
                if (photo.IsMain)
                {
                    return BadRequest(new ApiResponse(400, "No se puede borrar la foto principal"));
                }

                photoService.DeleteFromDisk(photo);
            }
            else
            {
                return BadRequest(new ApiResponse(400, "La foto no existe"));
            }

            product.RemovePhoto(photoId);

            unitOfWork.Repository<Product>().Update(product);

            var result = await unitOfWork.Complete();

            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problema agregando la foto al producto"));
            }

            return Ok();
        }

        [HttpPost("{id}/photo/{photoId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ProductDto>> SetMainPhoto(int id, int photoId)
        {
            var spec = new ProductSpecification(id);

            var product = await unitOfWork.Repository<Product>().GetEntityWithSpec(spec);

            if (product.Photos.All(x => x.Id != photoId))
            {
                return NotFound();
            }

            product.SetMainPhoto(photoId);

            unitOfWork.Repository<Product>().Update(product);

            var result = await unitOfWork.Complete();

            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problema agregando la foto al producto"));
            }

            return mapper.Map<Product, ProductDto>(product);
        }
    }
}
