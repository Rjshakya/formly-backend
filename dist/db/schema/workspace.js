import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth-schema.js";
import { formTable } from "./forms.js";
const workspaceTable = pgTable("workspaces", {
  id: t.uuid().primaryKey().default(sql`gen_random_uuid()`),
  name: t.varchar().default("my-work-space"),
  owner: t.text().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t.timestamp().defaultNow().notNull()
});
const workspaceRelations = relations(
  workspaceTable,
  ({ many, one }) => ({
    forms: many(formTable),
    owner: one(user, {
      fields: [workspaceTable.owner],
      references: [user.id]
    })
  })
);
export {
  workspaceRelations,
  workspaceTable
};
