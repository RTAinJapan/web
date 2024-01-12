import type { UpdateParams, UpdateResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().uuid(),
});

export const update = async (
	resource: string,
	params: UpdateParams,
): Promise<UpdateResult> => {
	const { id } = paramsSchema.parse(params);
	switch (resource) {
		case "users": {
			const result = await trpc.admin.users.update.mutate({
				id,
				data: params.data,
			});
			return { data: result };
		}
		case "events": {
			const result = await trpc.admin.events.update.mutate({
				id,
				data: params.data,
			});
			return { data: result };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
