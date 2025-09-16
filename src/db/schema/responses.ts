import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import formFieldTable from "./formfields";
import formTable from "./forms";
import respondentTable from "./respondents";

const responsesTable = pgTable("responses", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  form_field: t
    .uuid()
    .references(() => formFieldTable.id, { onDelete: "cascade" })
    .notNull(),
  form: t
    .varchar()
    .references(() => formTable.shortId, { onDelete: "cascade" })
    .notNull(),
  respondent: t
    .uuid()
    .references(() => respondentTable.id, { onDelete: "cascade" })
    .notNull(),
  value: t.text(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
});

export default responsesTable;
