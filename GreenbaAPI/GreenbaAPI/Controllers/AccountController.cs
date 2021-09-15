using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Business.Interfaces;
using Domain.Entities.Identity;
using GreenbaAPI.Dtos;
using GreenbaAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GreenbaAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IPhotoService photoService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexist")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await userManager.FindByClaimsPrincipleWithAddressAsync(HttpContext.User);

            return mapper.Map<Address, AddressDto>(user.Address);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await userManager.FindByClaimsPrincipleWithAddressAsync(HttpContext.User);

            user.Address = mapper.Map<AddressDto, Address>(address);

            var result = await userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return Ok(mapper.Map<Address, AddressDto>(user.Address));
            }

            return BadRequest("Problem updating the user");
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized(new ApiResponse(401));
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(
                    new ApiValidationErrorResponse { Errors = new[] { "El Email esta en uso" } });
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            var roleAddResult = await userManager.AddToRoleAsync(user, "Member");

            if (roleAddResult.Succeeded)
            {
                return BadRequest("Failed to add to role");
            }

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = await tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        //[HttpPost("userphoto")]
        //public async Task<ActionResult<UserDto>> AddUserPhoto([FromForm] UserPhotoDto photoDto)
        //{
        //    var user = await userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

        //    if (photoDto.Photo.Length > 0)
        //    {
        //        var photo = await photoService.SaveUserPhotoAsync(photoDto.Photo);

        //        if (photo != null)
        //        {
        //            user.FileName = photo.FileName;
        //            user.PictureUrl = photo.PictureUrl;

        //            var result = await userManager.UpdateAsync(user);

        //            if (result.Succeeded)
        //            {
        //                return Ok(new UserDto { DisplayName = user.DisplayName });
        //            }
        //            else
        //            {
        //                return BadRequest(new ApiResponse(400, "Problema al añadir foto"));
        //            }
        //        }
        //    }

        //    return BadRequest(new ApiResponse(400, "problema guardando foto "));
        //}
    }
}
