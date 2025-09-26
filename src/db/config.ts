import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as authSchema from "./schema/auth-schema.js";
import * as formFields from "./schema/formfields.js";
import * as forms from "./schema/forms.js";
import * as integrations from "./schema/integrations.js";
import * as respondents from "./schema/respondents.js";
import * as responses from "./schema/responses.js";
import * as workspaces from "./schema/workspace.js";

const db_url = process.env.DATABASE_URL;
const sql = neon(db_url);

export const getDb = () =>
  drizzle(sql, {
    schema: {
      ...workspaces,
      ...responses,
      ...respondents,
      ...integrations,
      ...forms,
      ...formFields,
      ...authSchema,
    },
  });

const db = getDb();
export default db;
