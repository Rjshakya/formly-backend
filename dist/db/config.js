import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./schema/auth-schema.js";
import * as formFields from "./schema/formfields.js";
import * as forms from "./schema/forms.js";
import * as integrations from "./schema/integrations.js";
import * as respondents from "./schema/respondents.js";
import * as responses from "./schema/responses.js";
import * as workspaces from "./schema/workspace.js";
const db_url = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: db_url
});
const db = drizzle({
  client: pool,
  schema: {
    ...authSchema,
    ...formFields,
    ...forms,
    ...integrations,
    ...respondents,
    ...responses,
    ...responses,
    ...workspaces
  }
});
var config_default = db;
export {
  config_default as default,
  pool
};
