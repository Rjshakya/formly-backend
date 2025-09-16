import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";

const workspaceTable = pgTable("workspaces", {
  id: t
    .uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: t.varchar().default("my-work-space"),
  owner: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt:t.timestamp().defaultNow().notNull(),
  updatedAt:t.timestamp().defaultNow().notNull()
});

export default workspaceTable;
