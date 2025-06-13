import { relations } from "drizzle-orm";
import { experiencesTable } from "../features/experience/models";
import { user } from "../features/auth/models";
import { commentTable } from "../features/comment/module";

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

export const commentRelations = relations(commentTable, ({ one }) => ({
  user: one(user, {
    fields: [commentTable.userId],
    references: [user.id],
  }),
  experience: one(experiencesTable, {
    fields: [commentTable.experienceId],
    references: [experiencesTable.id],
  }),
}));

export const experienceRelations = relations(experiencesTable, ({ many, one }) => ({
  comments: many(commentTable), 
  user: one(user, {
    fields: [experiencesTable.userId],
    references: [user.id],
  }),

}));
