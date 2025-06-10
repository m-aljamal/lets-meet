import {  pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const experiencesTable = pgTable("experiences", {
  id: text().primaryKey().$defaultFn(()=> nanoid() ),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  scheduledAt: timestamp("scheduled_at").notNull(),
  url: text(),
  imageUrl: text(),
  location: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});