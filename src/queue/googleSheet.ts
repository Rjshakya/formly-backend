import { FlowProducer, Queue } from "bullmq";
import { connection } from "../redis/config";

export const googleSheetQueueName = "googleSheetQueue";
export const syncQueueName = "syncQueue";

export const googleSheetsQueue = new Queue(googleSheetQueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 1000,
    },
  },
});

export const syncQueue = new Queue(syncQueueName, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "fixed",
      delay: 1000,
    },
  },
});

export const syncFlow = new FlowProducer({ connection });
