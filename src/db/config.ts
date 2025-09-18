import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./schema/auth-schema";
import * as formFields from "./schema/formfields";
import * as forms from "./schema/forms";
import * as integrations from "./schema/integrations";
import * as respondents from "./schema/respondents";
import * as responses from "./schema/responses";
import * as workspaces from "./schema/workspace"

const db_url = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: db_url,
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
    ...workspaces,
  },
});

export default db;
