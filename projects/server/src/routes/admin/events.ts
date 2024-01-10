import { z } from "zod";
import { prisma } from "../../prisma.js";
import { adminProcedure, router } from "../../trpc.js";
import { listSchema } from "./utils.js";
import { MarathonType } from "@prisma/client";

const createEventSchema = z.object({
	name: z.string(),
	startsAt: z.string().datetime(),
	endsAt: z.string().datetime(),
	marathonTypes: z.array(z.enum([MarathonType.ONLINE, MarathonType.ONSITE])),
});

export const eventsRouter = router({
	list: adminProcedure.input(listSchema).query(async ({ input }) => {
		const data = await prisma.event.findMany({
			skip: input.skip,
			take: input.take,
			orderBy: {
				name: input.orderBy === "name" ? input.order : undefined,
				startsAt: input.orderBy === "startsAt" ? input.order : undefined,
				endsAt: input.orderBy === "endsAt" ? input.order : undefined,
				published: input.orderBy === "published" ? input.order : undefined,
			},
			include: {
				eventMarathonTypes: true,
			},
		});
		const count = await prisma.event.count();
		return { data, count };
	}),
	get: adminProcedure
		.input(z.object({ id: z.string().uuid() }))
		.query(async ({ input }) => {
			const event = await prisma.event.findUnique({
				where: {
					id: input.id,
				},
				include: {
					eventMarathonTypes: true,
				},
			});
			if (!event) {
				throw new Error("event not found");
			}
			return event;
		}),
	create: adminProcedure
		.input(createEventSchema)
		.mutation(async ({ input }) => {
			const event = await prisma.event.create({
				data: {
					name: input.name,
					startsAt: input.startsAt,
					endsAt: input.endsAt,
				},
			});
			await prisma.eventMarathonType.createMany({
				data: input.marathonTypes.map((type) => ({
					eventId: event.id,
					marathonType: type,
				})),
			});
			return event;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string().uuid(),
				data: z.object({
					name: z.string(),
					startsAt: z.string(),
					endsAt: z.string(),
					published: z.boolean(),
					eventMarathonTypes: z.array(
						z.enum([MarathonType.ONLINE, MarathonType.ONSITE]),
					),
				}),
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
				},
			});
			// TODO: update event types
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
