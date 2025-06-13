import z from "zod";
import { publicProcedure, router } from "../../trpc";
import { commentTable } from "../../db/schema";
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
});
