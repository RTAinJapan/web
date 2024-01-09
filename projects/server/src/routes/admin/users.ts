import { z } from "zod";
import { prisma } from "../../prisma.js";
import { adminProcedure, router } from "../../trpc.js";
import { listSchema } from "./utils.js";
import type { Prisma } from "@prisma/client";

const getSelect = {
	id: true,
	email: true,
	username: true,
	userRoles: {
		select: {
			id: true,
			role: true,
		},
	},
	sessions: {
		select: {
			createdAt: true,
		},
		take: 1,
		orderBy: {
			createdAt: "desc",
		},
	},
} satisfies Prisma.UserSelect;

export const usersRouter = router({
	list: adminProcedure.input(listSchema).query(async ({ input }) => {
		const [data, count] = await Promise.all([
			prisma.user.findMany({
				select: getSelect,
				skip: input.skip,
				take: input.take,
				orderBy: {
					email: input.orderBy === "email" ? input.order : undefined,
				},
			}),
			prisma.user.count(),
		]);
		return {
			data: data.map((user) => ({
				...user,
				lastLogin: user.sessions[0]?.createdAt,
			})),
			count,
		};
	}),
	get: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const user = await prisma.user.findUnique({
				select: getSelect,
				where: {
					id: input.id,
				},
			});
			if (!user) {
				throw new Error("user not found");
			}
			return user;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				data: z.object({
					email: z.string().email().optional(),
				}),
			}),
		)
		.mutation(async ({ input }) => {
			const user = await prisma.user.update({
				where: {
					id: input.id,
				},
				data: {
					email: input.data.email,
				},
			});
			return user;
		}),
	delete: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.mutation(async ({ input }) => {
			const result = await prisma.user.delete({
				where: { id: input.id },
			});
			return result;
		}),
});
