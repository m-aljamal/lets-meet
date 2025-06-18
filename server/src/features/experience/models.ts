import { pgTable, text, timestamp, varchar, index } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { user } from "../auth/models";
import { createSelectSchema } from "drizzle-zod";

export const experiencesTable = pgTable(
  "experiences",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => nanoid()),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    scheduledAt: timestamp("scheduled_at").notNull(),
    url: text(),
    imageUrl: text(),
    location: text(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("experiences_user_id_idx").on(table.userId)]
);

export type Experience = typeof experiencesTable.$inferSelect;

export const experienceSelectSchema = createSelectSchema(experiencesTable);
