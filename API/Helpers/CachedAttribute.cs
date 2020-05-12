using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace API.Helpers
{
    public class CachedAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int _timeToLiveSeconds;
        public CachedAttribute(int timeToLiveSeconds)
        {
            _timeToLiveSeconds = timeToLiveSeconds;
        }

        // Filters allow code the be run before, or after specific stages in the request processing pipe line
        // We can run code before an action method is called, and after a method has been executed.
        // We are going to be do both, before we are checking if we have something inside the cache.
        // If we don't have it inside our cache we are going to execute the request, and the result of that we are putting inside the cache.
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();

            // Generate a key for the request
            var cacheKey = GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cachedResponse = await cacheService.GetCachedResponseAsync(cacheKey);
            
            if(!string.IsNullOrEmpty(cachedResponse))
            {
                // We are not letting the call to the controller
                // We will return the cached item.
                var contentResult = new ContentResult
                {
                    Content =  cachedResponse,
                    ContentType = "application/json",
                    StatusCode = 200
                };

                context.Result = contentResult;
                return;
            }

            // If there is no data inside de cache, we let the request happen.
            // After that we save de db result inside redis.
            var executedContext = await next(); // move to the controller

            if (executedContext.Result is OkObjectResult okObjectResult) 
            {
                await cacheService.CacheResponseAsync(cacheKey, okObjectResult.Value, TimeSpan.FromSeconds(_timeToLiveSeconds));
            }

        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            // We are sorting our query string param, so that they always will be the same(key).
            var keyBuilder = new StringBuilder();

            keyBuilder.Append($"{request.Path}");
            
            foreach (var (key,value) in request.Query.OrderBy(x => x.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            };

            return keyBuilder.ToString();
        }
    }
}