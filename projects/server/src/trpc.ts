import { initTRPC } from "@trpc/server";
import type { createContext } from "./context.js";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

const middleware = t.middleware;
const baseProcedure = t.procedure;

const errorLoggerMiddleware = middleware(async ({ next }) => {
  const result = await next();
  if (!result.ok) {
    console.error(result.error);
  }
  return result;
});

export const publicProcedure = baseProcedure.use(errorLoggerMiddleware);
