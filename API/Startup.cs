using API.Extensions;
using API.Helpers;
using API.Middleware;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();

      services.AddDbContext<StoreContext>(x =>
      x.UseSqlite(_configuration.GetConnectionString("DefaultConnection")));

      services.AddSingleton<IConnectionMultiplexer>(c =>
      {
        var configuration = ConfigurationOptions.Parse(_configuration
            .GetConnectionString("Redis"), true);
        return ConnectionMultiplexer.Connect(configuration);
      });

      services.AddApplicationServices();
      services.AddSwaggerDocumentation();

      services.AddAutoMapper(typeof(MappingProfiles));
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
      // So in the even that the request comes into our API server
      // but we don't have an end point this will redirect the call
      app.UseStatusCodePagesWithReExecute("/erros/{0}");

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseStaticFiles();

      app.UseCors("CorsPolicy");

      app.UseAuthorization();

      app.UseSwaggerDocumentation();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}
