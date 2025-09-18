import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import {formTable} from "./forms";

export const integrationTable = pgTable("integrations", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  formId: t.varchar().references(() => formTable.shortId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
});

export const googleSheetsIntegrationTable = t.pgTable(
  "google_sheets_integrations",
  {
    id: t
      .uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    integationId: t
      .uuid()
      .references(() => integrationTable.id, { onDelete: "cascade" }),
    spreadSheet_id: t.text().notNull(),
    spreadSheet_url: t.text().notNull(),
  }
);

// export default integrationTable;
