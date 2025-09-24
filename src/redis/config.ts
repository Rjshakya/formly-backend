import "dotenv/config";
// import IORedis from "ioredis";
// import { Redis } from "@upstash/redis/cloudflare";

const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

export const connection = {
  host: UPSTASH_REDIS_REST_URL,
  port: 6379,
  password: UPSTASH_REDIS_REST_TOKEN,
  tls: {},
};
