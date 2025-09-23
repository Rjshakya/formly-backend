import {  Queue } from "bullmq";
import { connection } from "../redis/config.js";

export const googleSheetQueueName = "googleSheetQueue";
export const syncQueueName = "syncQueue";

export const googleSheetsQueue = new Queue(googleSheetQueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: {
      age: 60 * 30,
      count: 1000,
    },
    removeOnFail: {
      age: 60 * 30 * 24,
      count: 1000,
    },
  },
});

export const eventQueue = new Queue("event-queue", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: {
      age: 60 * 60,
      count: 1000,
    },
    removeOnFail: {
      age: 60 * 30 * 24,
      count: 1000,
    },
  },
});
