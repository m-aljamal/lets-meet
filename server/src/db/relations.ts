import { relations } from "drizzle-orm";
import { experiencesTable } from "../features/experience/models";
import { user } from "../features/auth/models";

// Define relations for the user table
export const userRelations = relations(user, ({ many }) => ({
  experiences: many(experiencesTable),
}));

// Define relations for the experiences table
export const experiencesRelations = relations(experiencesTable, ({ one }) => ({
  user: one(user, {
    fields: [experiencesTable.userId],
    references: [user.id],
  }),
}));
