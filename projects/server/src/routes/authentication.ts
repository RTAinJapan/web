import { z } from "zod";
import { publicProcedure, router, sessionProcedure } from "../trpc.js";
import { prisma } from "../prisma.js";
import { createRandomToken } from "../utils/random-token.js";
import { TRPCError } from "@trpc/server";

export const authenticationRouter = router({
	initialize: publicProcedure
		.input(
			z.object({ email: z.string().email(), callbackUrl: z.string().url() }),
		)
		.mutation(async ({ input }) => {
			const user = await prisma.user.findUnique({
				where: { email: input.email },
			});
			if (!user) {
				console.log("user not found");
				// TODO: send email
				return;
			}

			const token = createRandomToken(255);

			await prisma.authenticationToken.create({
				data: {
					user: { connect: { id: user.id } },
					token: token,
				},
			});

			const url = new URL(input.callbackUrl);
			url.searchParams.append("token", token);

			console.log(url.href);
		}),

	verifyToken: publicProcedure
		.input(z.object({ token: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const authenticationToken = await prisma.authenticationToken.findUnique({
				where: { token: input.token },
			});
			if (!authenticationToken) {
				throw new TRPCError({ code: "NOT_FOUND", message: "token not found" });
			}

			await prisma.authenticationToken.delete({
				where: { token: input.token },
			});

			const sessionToken = createRandomToken(255);

			await prisma.session.create({
				data: {
					user: { connect: { id: authenticationToken.userId } },
					token: sessionToken,
				},
			});

			ctx.setSessionToken(sessionToken);
		}),

	signOut: sessionProcedure.mutation(({ ctx }) => {
		ctx.clearSessionToken();
	}),
});
