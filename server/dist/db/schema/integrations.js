import { relations, sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { formTable } from "./forms.js";
const integrationTable = pgTable("integrations", {
  id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
  formId: t.varchar().references(() => formTable.shortId, {
    onDelete: "cascade",
    onUpdate: "cascade"
  }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull()
});
const googleSheetsIntegrationTable = t.pgTable(
  "google_sheets_integrations",
  {
    id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
    integationId: t.uuid().references(() => integrationTable.id, { onDelete: "cascade" }),
    spreadSheet_id: t.text().notNull(),
    spreadSheet_url: t.text().notNull(),
    formId: t.varchar().references(() => formTable.shortId, {
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  }
);
const integrationsRelations = relations(integrationTable, ({ one }) => ({
  forms: one(formTable, {
    fields: [integrationTable.formId],
    references: [formTable.shortId]
  })
}));
export {
  googleSheetsIntegrationTable,
  integrationTable,
  integrationsRelations
};
