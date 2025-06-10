import "dotenv/config";
import { z } from "zod";

import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
