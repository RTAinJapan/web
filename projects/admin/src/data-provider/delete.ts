import type { DeleteParams, DeleteResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().uuid(),
});

export const deleteMethod = async (
	resource: string,
	params: DeleteParams,
): Promise<DeleteResult> => {
	const { id } = paramsSchema.parse(params);
	switch (resource) {
		case "users": {
			const result = await trpc.admin.users.delete.mutate({ id });
			return { data: result };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
