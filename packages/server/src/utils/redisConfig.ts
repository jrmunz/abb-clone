import Redis from "ioredis";

const isProduction = process.env.NODE_ENV === "production";
export const redis = isProduction ? new Redis(process.env.REDIS_URL) : new Redis();
