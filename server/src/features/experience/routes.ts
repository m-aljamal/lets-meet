import { DEFAULT_EXPERIENCE_LIMIT } from "./../../../../client/src/utils/constants";
import z from "zod";
import db from "../../db";
import { commentTable, experiencesTable } from "../../db/schema";
import { publicProcedure, router } from "../../trpc";
import { desc, eq, getTableColumns } from "drizzle-orm";

export const experienceRouter = router({
  feed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? DEFAULT_EXPERIENCE_LIMIT;
      const cursor = input.cursor ?? 0;

      const experiences = await db
        .select({
          ...getTableColumns(experiencesTable),
          commentsCount: db.$count(
            commentTable,
            eq(commentTable.experienceId, experiencesTable.id)
          ),
        })
        .from(experiencesTable)
        .orderBy(desc(experiencesTable.createdAt))
        .limit(limit ?? DEFAULT_EXPERIENCE_LIMIT)
        .offset(cursor ?? 0);

      return {
        experiences,
        nextCursor: experiences.length === limit ? cursor + limit : undefined,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const [experience] = await db
        .select({
          ...getTableColumns(experiencesTable),
          commentsCount: db.$count(
            commentTable,
            eq(commentTable.experienceId, experiencesTable.id)
          ),
        })
        .from(experiencesTable)
        .where(eq(experiencesTable.id, input.id))
        .limit(1);

      if (!experience) {
        throw new Error("Experience not found");
      }

      return experience;
    }),
});
