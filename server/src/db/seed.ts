import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { experiencesTable } from "./schema";
import { env } from "../../utils/env";
 
const db = drizzle(env.DATABASE_URL);

async function main() {
  for (let i = 0; i < 10; i++) {
    await db.insert(experiencesTable).values({
      title: `Experience ${i}`,
      content: `Content ${i}`,
      scheduledAt: new Date(),
    });
  }

  console.log("Experiences created!");
}

main();
