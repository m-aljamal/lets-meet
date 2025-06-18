import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { commentTable, experienceSelectSchema } from "../../db/schema";
import db from "../../db";
import { eq } from "drizzle-orm";

export const commentRouter = router({
  byExperienceId: publicProcedure
    .input(
      z.object({
        experienceId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { experienceId } = input;
      const comments = await db
        .select()
        .from(commentTable)
        .where(eq(commentTable.experienceId, experienceId));
      return comments;
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        experienceId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const now = new Date().toISOString();
      console.log(input.experienceId, input.content);
    }),
});
