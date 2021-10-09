using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using API.Errors;
using AutoMapper;
using Business.Interfaces;
using Domain.Entities.Identity;
using GreenbaAPI.Dtos;
using GreenbaAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace GreenbaAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;
        private readonly ILogger<AccountController> logger;
        private readonly IEmailService emailService;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper,
            IPhotoService photoService,
            ILogger<AccountController> logger,
            IEmailService emailService)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.mapper = mapper;
            this.photoService = photoService;
            this.logger = logger;
            this.emailService = emailService;
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

            if (user == null || !user.Active)
            {
                logger.LogError("Unautorized", user);
                return Unauthorized(new ApiResponse(401));
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
            {
                logger.LogError("Unautorized", user);
                return Unauthorized(new ApiResponse(401));
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPut("activate")]
        public async Task<ActionResult<UserDto>> Activate(ValidationRequestDto request)
        {
            var user = await userManager.FindByEmailAsync(request.UserName);

            if (user == null)
            {
                return BadRequest("Invalid request");
            }

            user.Active = true;
            var result = await userManager.ChangePasswordAsync(user, request.OldPassword, request.Password);

            if (!result.Succeeded)
            {
                return BadRequest("Invalid request");
            }

            return Ok(user);
        }

        [HttpPut("deactivate")]
        public async Task<ActionResult<UserDto>> Deactivate(string userName)
        {
            var user = await userManager.FindByEmailAsync(userName);

            if (user == null)
            {
                return BadRequest("User doesn't exist");
            }

            user.Active = false;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return NotFound("User not found");
            }

            return Ok(user);
        }

        [HttpPut("forgotPassword")]
        public async Task<ActionResult<UserDto>> ForgotPassword(string userName)
        {
            var user = await userManager.FindByEmailAsync(userName);

            if (user == null)
            {
                return BadRequest("User doesn't exist");
            }
        }

        [HttpGet("validateToken")]
        public ActionResult<ValidationResponseDto> ValidateToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("El link es invalido"); ;
            }

            var result = tokenService.ValidateToken(token, out var userName);

            if (!result)
            {
                logger.LogError("Invalid Token");
                return new ValidationResponseDto() { ValidToken = false };
            }

            return new ValidationResponseDto() { ValidToken = true, UserName = userName };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                logger.LogError("El email esta en uso", registerDto.Email);
                return new BadRequestObjectResult(
                    new ApiValidationErrorResponse { Errors = new[] { "El Email esta en uso" } });
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email,
                Active = false
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

            var token = await tokenService.CreateToken(user);

            await emailService.SendUserActivationEmail(registerDto.Email);

            return new UserDto
            {
                //DisplayName = user.DisplayName,
                //Token = await tokenService.CreateToken(user),
                //Email = user.Email
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
