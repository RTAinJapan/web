import { initTRPC } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { SESSION_COOKIE_DURATION, SESSION_COOKIE_NAME } from "./constants.js";
import { env } from "./env.js";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const setSessionToken = (token: string) => {
    res.setCookie(SESSION_COOKIE_NAME, token, {
      path: "/",
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: SESSION_COOKIE_DURATION,
    });
  };

  const clearSessionToken = () => {
    res.clearCookie(SESSION_COOKIE_NAME);
  };

  const sessionToken = req.cookies[SESSION_COOKIE_NAME];
  if (sessionToken) {
    return {
      sessionToken,
      setSessionToken,
      clearSessionToken,
    };
  }

  return {
    setSessionToken,
    clearSessionToken,
  };
};

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
