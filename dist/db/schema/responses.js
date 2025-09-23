import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { formFieldTable } from "./formfields.js";
import { formTable } from "./forms.js";
import { respondentTable } from "./respondents.js";
const responsesTable = pgTable("responses", {
  id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
  form_field: t.uuid().references(() => formFieldTable.id, { onDelete: "cascade" }).notNull(),
  form: t.varchar().references(() => formTable.shortId, { onDelete: "cascade" }).notNull(),
  respondent: t.uuid().references(() => respondentTable.id, { onDelete: "cascade" }).notNull(),
  value: t.text(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull()
});
const responsesRelations = relations(
  responsesTable,
  ({ many, one }) => ({
    form: one(formTable, {
      fields: [responsesTable.form],
      references: [formTable.shortId]
    }),
    responses: one(respondentTable, {
      fields: [responsesTable.respondent],
      references: [respondentTable.id]
    }),
    formField: one(formFieldTable, {
      fields: [responsesTable.form_field],
      references: [formFieldTable.id]
    })
  })
);
export {
  responsesRelations,
  responsesTable
};
