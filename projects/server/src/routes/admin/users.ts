import { z } from "zod";
import { prisma } from "../../prisma.js";
import { adminProcedure, router } from "../../trpc.js";
import { sortOrderSchema } from "../../utils/schemas.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const usersRouter = router({
	list: adminProcedure
		.input(
			z.object({
				take: z.number(),
				skip: z.number(),
				orderBy: z.string(),
				order: sortOrderSchema,
			}),
		)
		.query(async ({ input }) => {
			const data = await prisma.user.findMany({
				skip: input.skip,
				take: input.take,
				orderBy: {
					id: input.orderBy === "id" ? input.order : undefined,
					email: input.orderBy === "email" ? input.order : undefined,
				},
			});
			const count = await prisma.user.count();
			return { data, count };
		}),
	get: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const user = await prisma.user.findUnique({
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
	deleteMany: adminProcedure
		.input(z.object({ ids: z.array(z.string().uuid()) }))
		.mutation(async ({ input }) => {
			const deleted: string[] = [];
			await prisma.$transaction(async (tx) => {
				for (const id of input.ids) {
					try {
						await tx.user.delete({
							where: { id },
						});
						deleted.push(id);
					} catch (error) {
						if (error instanceof PrismaClientKnownRequestError) {
							if (error.code === "P2016") {
								continue;
							}
						}
						throw error;
					}
				}
			});
			return deleted;
		}),
});
