using System;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        // PUT something into the redis db
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null) return;

            // We want this to be consistent with how the api would send their requests
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialisedResponse = JsonSerializer.Serialize(response, options);

            await _database.StringSetAsync(cacheKey,serialisedResponse,timeToLive);
        }

        // Get something  out of redis
        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cachedReponse = await _database.StringGetAsync(cacheKey);

            if (cachedReponse.IsNullOrEmpty) return null;

            return cachedReponse;
        }
    }
}