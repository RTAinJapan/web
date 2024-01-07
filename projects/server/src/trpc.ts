import { TRPCError, initTRPC } from "@trpc/server";
import type { createContext } from "./context.js";
import { prisma } from "./prisma.js";
import { Role } from "@prisma/client";

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;

const middleware = t.middleware;
const procedure = t.procedure;

export const publicProcedure = procedure.use(
	middleware(async ({ next }) => {
		const result = await next();
		if (!result.ok) {
			console.error(result.error);
		}
		return result;
	}),
);

export const sessionProcedure = publicProcedure.use(
	middleware(async ({ ctx, next }) => {
		if (!ctx.sessionToken) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const session = await prisma.session.findUnique({
			where: { token: ctx.sessionToken },
			include: { user: true },
		});

		if (!session) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		return next({
			ctx: {
				sessionToken: session.token,
				user: session.user,
			},
		});
	}),
);

export const adminProcedure = publicProcedure.use(
	middleware(async ({ ctx, next }) => {
		if (!ctx.sessionToken) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const session = await prisma.session.findUnique({
			where: {
				token: ctx.sessionToken,
				user: {
					userRoles: {
						some: {
							role: Role.ADMIN,
						},
					},
				},
			},
			include: { user: true },
		});

		if (!session) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		return next({
			ctx: {
				sessionToken: session.token,
				user: session.user,
			},
		});
	}),
);
