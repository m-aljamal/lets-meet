import { DEFAULT_EXPERIENCE_LIMIT } from "./../../../../client/src/utils/constants";
import z from "zod";
import db from "../../db";
import { experiencesTable } from "../../db/schema";
import { publicProcedure, router } from "../../trpc";
import { desc } from "drizzle-orm";

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
        .select()
        .from(experiencesTable)
        .orderBy(desc(experiencesTable.createdAt))
        .limit(limit ?? DEFAULT_EXPERIENCE_LIMIT)
        .offset(cursor ?? 0);

      return {
        experiences,
        nextCursor: experiences.length === limit ? cursor + limit : undefined,
      };
    }),
});
