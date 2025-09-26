import { app } from "./app.js";
import { httpServerHandler } from "cloudflare:node";
import db from "./db/config.js";
import logger from "./utils/logger.js";

const port = Number(process.env.PORT);

app.listen(port, async() => {
  const version = await db.execute(`SELECT version()`)
  logger.info(`app listening at http://localhost:${port} , db : ${version}`);
});

export default httpServerHandler({ port });
