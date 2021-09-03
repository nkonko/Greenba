﻿using System;
using System.Threading.Tasks;

namespace Source.Cache.Interfaces
{
    public interface IResponseCacheService
    {
        Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive);

        Task<string> GetCachedResponse(string cacheKey);
    }
}
