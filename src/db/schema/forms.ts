import { sql, Table } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import workspaceTable from "./workspace";
import { user } from "./auth-schema";
import { uid } from "../../utils/shortIDgen";

const formTable = pgTable("forms", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: t.varchar({ length: 255 }).notNull(),
  workspace: t
    .uuid()
    .references(() => workspaceTable.id, { onDelete: "cascade" })
    .notNull(),
  creator: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  shortId: t.varchar({ length: 255 }).unique().primaryKey(),
  form_schema: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
});

export default formTable;
