import type { UpdateParams, UpdateResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().uuid(),
	data: z.object({
		email: z.string().email(),
	}),
});

export const update = async (
	resource: string,
	params: UpdateParams,
): Promise<UpdateResult> => {
	const { id, data } = paramsSchema.parse(params);
	switch (resource) {
		case "users": {
			const result = await trpc.admin.users.update.mutate({ id, data });
			return { data: result };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
