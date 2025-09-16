import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import formTable from "./forms";

export const appEnum = t.pgEnum("app", ["sheets", "notion", "null"]);

export const integrationTable = pgTable("integrations", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  userId: t.text().references(() => user.id, { onDelete: "cascade" }),

  provider: t.text().notNull(),
  app: appEnum().default("null"),
  spreadsheetId: t.text(),
  spreadsheetUrl: t.text(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
  form: t.varchar().references(() => formTable.shortId , {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
});

export default integrationTable;
