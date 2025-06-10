import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../utils/auth";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { createContext, protectedProcedure, publicProcedure, router } from "./trpc";

const appRouter = router({
  greeting: protectedProcedure.query(() => "hello tRPC v10!"),
});
export type AppRouter = typeof appRouter;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
