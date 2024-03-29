import { SESSION_COOKIE_DURATION } from "./constants.js";
import { prisma } from "./prisma.js";
import { adminRouter } from "./routes/admin.js";
import { authenticationRouter } from "./routes/authentication.js";
import { registrationRouter } from "./routes/registration.js";
import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
	admin: adminRouter,
	registration: registrationRouter,
	authentication: authenticationRouter,

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
