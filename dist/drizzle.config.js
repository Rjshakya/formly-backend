import "dotenv/config";
import { defineConfig } from "drizzle-kit";
var drizzle_config_default = defineConfig({
  out: "./drizzle",
  schema: "../src/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgress@localhost:5432/postgres"
  }
});
export {
  drizzle_config_default as default
};
