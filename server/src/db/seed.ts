import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { commentTable, experiencesTable, user } from "./schema";
import { env } from "../../utils/env";
import { faker } from "@faker-js/faker";

const db = drizzle(env.DATABASE_URL);

async function main() {
  const [findUser] = await db.select().from(user);

  if (!findUser) {
    console.log("User not found");
    return;
  }
  for (let i = 0; i < 30; i++) {
    await db.insert(experiencesTable).values({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      scheduledAt: faker.date.soon(),
      userId: findUser.id,
    });
  }
  const [experience] = await db.select().from(experiencesTable);
  if (experience) {
    for (let i = 0; i < 3; i++) {
      await db.insert(commentTable).values({
        content: faker.lorem.sentence(),
        userId: findUser.id,
        experienceId: experience.id,
      });
    }
  }
}
main();
