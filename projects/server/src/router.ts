import { SESSION_COOKIE_DURATION } from "./constants.js";
import { prisma } from "./prisma.js";
import { registrationRouter } from "./routes/registration.js";
import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  registration: registrationRouter,

  validateSession: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.sessionToken) {
      return false;
    }

    const session = await prisma.session.findUnique({
      where: {
        token: ctx.sessionToken,
        createdAt: {
          lt: new Date(Date.now() + SESSION_COOKIE_DURATION),
        },
      },
    });

    return session ? true : false;
  }),
});

export type AppRouter = typeof appRouter;
