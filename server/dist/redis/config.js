import "dotenv/config";
import IORedis from "ioredis";
const connection = new IORedis(process.env.REDIS_URL);
export {
  connection
};
