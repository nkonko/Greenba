using System.IO;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Infrastructure.Data;
using Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;

namespace API
{
  public class Startup
  {
    private readonly IConfiguration _configuration;
    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    // This is convention bases and because this is called Configure Development Services
    // Anything inside here is going to be executed / added to our dependency injection container
    // when we are running in development mode.
    public void ConfigureDevelopmentServices(IServiceCollection services)
    {
      services.AddDbContext<StoreContext>(x =>
        x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));

      services.AddDbContext<AppIdentityDbContext>(x => 
        x.UseSqlite(_configuration.GetConnectionString("IdentityConnection")));

        ConfigureServices(services);
    }

    public void ConfigureProductionServices(IServiceCollection services)
    {
      // Configure in here MYSQL or just SQL server
      // services.AddDbContext<StoreContext>(x =>
      //   x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));

      // services.AddDbContext<AppIdentityDbContext>(x => 
      //   x.UseSqlite(_configuration.GetConnectionString("IdentityConnection")));

        ConfigureServices(services);
    }
    

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddAutoMapper(typeof(MappingProfiles));

      services.AddControllers();

      // Has it own methods now
      // services.AddDbContext<StoreContext>(x =>
      // x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));

      // services.AddDbContext<AppIdentityDbContext>(x => 
      //   x.UseSqlite(_configuration.GetConnectionString("IdentityConnection")));

      services.AddSingleton<IConnectionMultiplexer>(c =>
      {
        var configuration = ConfigurationOptions.Parse(_configuration
            .GetConnectionString("Redis"), true);
        return ConnectionMultiplexer.Connect(configuration);
      });

      services.AddApplicationServices();
      services.AddIdentityServices(_configuration);
      services.AddSwaggerDocumentation();

      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
        {
          policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
        });
      });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseMiddleware<ExceptionMiddleware>();
      
      // {0} is the error code
      app.UseStatusCodePagesWithReExecute("/errors/{0}");

      app.UseHttpsRedirection();

      app.UseRouting();

      //  uses the wwwroot file
      app.UseStaticFiles();

      // because we moved the images out of the wwwroot folder
      // we need to tell the api where to look for the images.
      app.UseStaticFiles(new StaticFileOptions 
      {
        FileProvider = new PhysicalFileProvider(
          Path.Combine(Directory.GetCurrentDirectory(), "Content")
        ),
        RequestPath = "/content"
      });

      app.UseCors("CorsPolicy");

      app.UseAuthentication();
      
      app.UseAuthorization();

      app.UseSwaggerDocumentation();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
        //endpoints.MapFallbackToController("Index", "Fallback");
      });
    }
  }
}
