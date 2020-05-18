using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    // Catches the internal server error exceptions
    // and will return a normalized error back to the client (conform the other erros)
    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
      _env = env;
      _logger = logger;
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context) 
    {
        try 
        {
            // If there is no exception then the request moves on to its next stage
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            // 500
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = _env.IsDevelopment() ? 
                new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString()) :
                new ApiException((int)HttpStatusCode.InternalServerError);

            // options so that the json is not in pascal code
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
  }
}