import { relations, sql, Table } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { workspaceTable } from "./workspace";
import { user } from "./auth-schema";
import { uid } from "../../utils/shortIDgen";
import { respondentTable } from "./respondents";
import { responsesTable } from "./responses";
import { integrationTable } from "./integrations";
import { formFieldTable } from "./formfields";

export const formTable = pgTable("forms", {
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
  shortId: t.varchar({ length: 255 }).unique(),
  form_schema: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull(),
});

export const formRelations = relations(formTable, ({ one, many }) => ({
  workspace: one(workspaceTable, {
    fields: [formTable.workspace],
    references: [workspaceTable.id],
  }),
  respondents: many(respondentTable),
  responses: many(responsesTable),
  integrations: many(integrationTable),
  formFields: many(formFieldTable),
}));
