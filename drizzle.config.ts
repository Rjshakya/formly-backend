import "dotenv/config";

import { Config, defineConfig } from "drizzle-kit";


const dbUrl = process.env.DATABASE_URL

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: dbUrl!
  },
})
