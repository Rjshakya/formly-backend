import { app } from "./app.js";
import { pool } from "./db/config.js";
import { httpServerHandler } from "cloudflare:node";

const port = Number(process.env.PORT);

// await pool
//   ?.connect()
//   ?.then(() => {
//     console.log("Database connected");

//     app.listen(port, async () => {
//       console.log(`app listening at http://localhost:${port}`);
//     });
//   })
//   ?.catch(() => {
//     console.log("Database connection failed");
//     process.exit(1);
//   });

pool.connect();
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

export default httpServerHandler({ port });
