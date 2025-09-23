import { app } from "./app.js";
import { pool } from "./db/config.js";
const port = process.env.PORT || 5000;

await pool
  ?.connect()
  ?.then(() => {
    console.log("Database connected");

    app.listen(port, async () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  })
  ?.catch(() => {
    console.log("Database connection failed");
    process.exit(1);
  });
