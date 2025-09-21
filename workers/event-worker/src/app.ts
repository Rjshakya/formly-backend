import { Worker } from "bullmq";
import { connection } from "./config";

const eventWorker = new Worker(
  "event-queue",
  async (job) => {
    if (job.name === "create-integration-event") {
      console.log("Integration Event Worker is running....", job.data);
    }
  },
  {
    connection,
    autorun:false
  },
  
  
);

await eventWorker.run()
console.log('hello eveny');


eventWorker.on("ready", () => {
  console.log("Event Worker is ready to process jobs");
});

eventWorker.on("error", (err) => {
  console.log(`error in event worker`, err);
})
