import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { workspaceTable } from "./workspace.js";
import { user } from "./auth-schema.js";
import { respondentTable } from "./respondents.js";
import { responsesTable } from "./responses.js";
import { integrationTable } from "./integrations.js";
import { formFieldTable } from "./formfields.js";
const formTable = pgTable("forms", {
  id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
  name: t.varchar({ length: 255 }).notNull(),
  workspace: t.uuid().references(() => workspaceTable.id, { onDelete: "cascade" }).notNull(),
  creator: t.text().notNull().references(() => user.id, { onDelete: "cascade" }),
  shortId: t.varchar({ length: 255 }).unique(),
  form_schema: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull()
});
const formRelations = relations(formTable, ({ one, many }) => ({
  workspace: one(workspaceTable, {
    fields: [formTable.workspace],
    references: [workspaceTable.id]
  }),
  respondents: many(respondentTable),
  responses: many(responsesTable),
  integrations: many(integrationTable),
  formFields: many(formFieldTable)
}));
export {
  formRelations,
  formTable
};
