import { z } from "zod";
import { prisma } from "../../prisma.js";
import { adminProcedure, router } from "../../trpc.js";
import { listSchema } from "./utils.js";
import { EventType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const createEventSchema = z.object({
	name: z.string(),
	startsAt: z.string().datetime(),
	endsAt: z.string().datetime(),
	published: z.boolean(),
	type: z.enum([EventType.Onsite, EventType.Online]),
});

export const eventsRouter = router({
	list: adminProcedure.input(listSchema).query(async ({ input }) => {
		const [events, count] = await Promise.all([
			prisma.event.findMany({
				skip: input.skip,
				take: input.take,
				orderBy: {
					name: input.orderBy === "name" ? input.order : undefined,
					startsAt: input.orderBy === "startsAt" ? input.order : undefined,
					endsAt: input.orderBy === "endsAt" ? input.order : undefined,
					published: input.orderBy === "published" ? input.order : undefined,
				},
			}),
			prisma.event.count(),
		]);
		return {
			data: events.map((event) => ({
				id: event.id,
				name: event.name,
				startsAt: event.startsAt,
				endsAt: event.endsAt,
				published: event.published,
				type: event.type,
			})),
			count,
		};
	}),
	get: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const event = await prisma.event.findUnique({
				where: {
					id: input.id,
				},
			});
			if (!event) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}
			return {
				id: event.id,
				name: event.name,
				startsAt: event.startsAt,
				endsAt: event.endsAt,
				published: event.published,
				type: event.type,
			};
		}),
	create: adminProcedure
		.input(createEventSchema)
		.mutation(async ({ input }) => {
			const event = await prisma.event.create({
				data: {
					name: input.name,
					startsAt: input.startsAt,
					endsAt: input.endsAt,
					published: input.published,
					type: input.type,
				},
			});
			return event;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				data: createEventSchema.partial(),
			}),
		)
		.mutation(async ({ input }) => {
			const event = await prisma.event.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.data.name,
					startsAt: input.data.startsAt,
					endsAt: input.data.endsAt,
					published: input.data.published,
					type: input.data.type,
				},
			});
			return event;
		}),
	delete: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.mutation(async ({ input }) => {
			const result = await prisma.event.delete({
				where: { id: input.id },
			});
			return result;
		}),
});
