import dotenv from "dotenv";

import { memoryCache } from "../services/cache-manager/index.js";

dotenv.config();

const cacheLife = process.env.CACHE_LIFE ? +process.env.CACHE_LIFE : undefined;

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  // Try to get the cached response
  const cachedResponse = await memoryCache.get(key);

  if (cachedResponse !== undefined) {
    // The response was found in cache, return it
    if (cachedResponse.headers) {
      res.set(cachedResponse.headers);
    }

    res.send(cachedResponse.body);
    return;
  }

  // The response was not found in cache, continue to the next middleware
  // ! we add this function as the NEW way to send data to the client
  res.sendData = async ({ body, headers } = {}) => {
    try {
      await memoryCache.set(
        key,
        {
          headers,
          body,
        },
        cacheLife
      );

      if (headers) {
        res.set(headers);
      }

      res.send(body);
    } catch (error) {
      next(error);
    }
  };

  next();
};

export { cacheMiddleware };
