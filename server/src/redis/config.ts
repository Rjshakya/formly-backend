import "dotenv/config";
import IORedis from "ioredis";

export const connection = new IORedis(process.env.REDIS_URL!);
