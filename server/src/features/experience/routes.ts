import db from "../../db";
import { experiencesTable } from "../../db/schema";
import { publicProcedure, router } from "../../trpc";
import { desc } from "drizzle-orm";

export const experienceRouter = router({
  feed: publicProcedure.query(async ({ ctx }) => {
    const data = await db
      .select()
      .from(experiencesTable)
      .orderBy(desc(experiencesTable.createdAt));

    return data;
  }),
});
