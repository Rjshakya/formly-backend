import { Queue } from "bullmq";
import { connection } from "../redis/config.js";
const googleSheetQueueName = "googleSheetQueue";
const syncQueueName = "syncQueue";
const googleSheetsQueue = new Queue(googleSheetQueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1e3
    },
    removeOnComplete: {
      age: 60 * 30,
      count: 1e3
    },
    removeOnFail: {
      age: 60 * 30 * 24,
      count: 1e3
    }
  }
});
const eventQueue = new Queue("event-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1e3
    },
    removeOnComplete: {
      age: 60 * 60,
      count: 1e3
    },
    removeOnFail: {
      age: 60 * 30 * 24,
      count: 1e3
    }
  }
});
export {
  eventQueue,
  googleSheetQueueName,
  googleSheetsQueue,
  syncQueueName
};
