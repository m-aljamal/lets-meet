import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import {
  commentTable,
  experienceSelectSchema,
  experiencesTable,
} from "../../db/schema";
import db from "../../db";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

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
      const [experience] = await db
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.id, input.experienceId));
      if (!experience) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Experience not found",
        });
      }
      const [comment] = await db
        .insert(commentTable)
        .values({
          content: input.content,
          experienceId: input.experienceId,
          userId: ctx.user.id,
        })
        .returning();
      return comment;
    }),

  updateComment: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [comment] = await db
        .update(commentTable)
        .set({ content: input.content })
        .where(
          and(
            eq(commentTable.id, input.commentId),
            eq(commentTable.userId, ctx.user.id)
          )
        )
        .returning();
      return comment;
    }),

  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(commentTable)
        .where(
          and(
            eq(commentTable.id, input.commentId),
            eq(commentTable.userId, ctx.user.id)
          )
        );
    }),
});
