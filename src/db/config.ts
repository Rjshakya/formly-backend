import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const db_url = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: db_url,
});

const db = drizzle({ client: pool });

export default db;
