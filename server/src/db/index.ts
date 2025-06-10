import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../../utils/env";

const db = drizzle(env.DATABASE_URL);

export default db;
