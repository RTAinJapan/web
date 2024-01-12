import type { CreateParams, CreateResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const createEventSchema = z.object({
	name: z.string(),
	startsAt: z.date().transform((date) => date.toISOString()),
	endsAt: z.date().transform((date) => date.toISOString()),
	published: z.boolean(),
	type: z.enum(["Onsite", "Online"]),
});

export const create = async (
	resource: string,
	params: CreateParams,
): Promise<CreateResult> => {
	switch (resource) {
		case "users":
			throw new Error("not allowed");
		case "events": {
			const input = createEventSchema.parse(params.data);
			const res = await trpc.admin.events.create.mutate(input);
			return { data: res };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
