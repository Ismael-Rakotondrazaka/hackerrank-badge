import { caching } from "cache-manager";
import dotenv from "dotenv";

dotenv.config();

const cacheMax = process.env.CACHE_MAX ? +process.env.CACHE_MAX : undefined;
const cacheLife = process.env.CACHE_LIFE ? +process.env.CACHE_LIFE : undefined;

const memoryCache = await caching("memory", {
  max: cacheMax,
  ttl: cacheLife,
});

export { memoryCache };
