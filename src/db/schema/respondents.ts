import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import formTable from "./forms";

const respondentTable = pgTable("respondents", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  country: t.varchar({ length: 255 }),
  city: t.varchar({ length: 255 }),
  form: t
    .varchar()
    .references(() => formTable.shortId, { onDelete: "cascade" })
    .notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
});

export default respondentTable;
