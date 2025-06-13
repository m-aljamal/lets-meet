import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { user } from "../auth/models";
import { experiencesTable } from "../experience/models";

export const commentTable = pgTable("comment", {
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  content: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  experienceId: text()
    .notNull()
    .references(() => experiencesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
