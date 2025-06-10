import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { CurrentUser, user } from "./features/auth/models";
import { auth } from "../utils/auth";
import { fromNodeHeaders } from "better-auth/node";
import db from "./db";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

type Context = Awaited<ReturnType<typeof createContext>>;

export async function createContext(
  opts: trpcExpress.CreateExpressContextOptions
) {
  const context = {
    req: opts.req,
    res: opts.res,
    user: null as CurrentUser | null,
  };

  const headers = opts.req.headers;

  if (!headers) {
    return context;
  }

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });

  if (!session) {
    return context;
  }

  // Get user from database
  const [currentUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));

  if (!currentUser) {
    return context;
  }
  context.user = currentUser;

  return context;
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          // Only show zod errors for bad request errors
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

// Create protected procedure
const authMiddleware = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx: {
      ...ctx,
      // Ready to be used in procedures
      user: ctx.user as CurrentUser,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(authMiddleware);
