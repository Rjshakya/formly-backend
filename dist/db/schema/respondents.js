import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { formTable } from "./forms.js";
import { responsesTable } from "./responses.js";
const respondentTable = pgTable("respondents", {
  id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
  country: t.varchar({ length: 255 }),
  city: t.varchar({ length: 255 }),
  form: t.varchar().references(() => formTable.shortId, { onDelete: "cascade" }).notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull()
});
const respondentRelations = relations(
  respondentTable,
  ({ many, one }) => ({
    form: one(formTable, {
      fields: [respondentTable.form],
      references: [formTable.shortId]
    }),
    responses: many(responsesTable)
  })
);
export {
  respondentRelations,
  respondentTable
};
