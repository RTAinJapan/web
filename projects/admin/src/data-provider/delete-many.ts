import type { DeleteManyParams, DeleteManyResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	ids: z.array(z.string().uuid()),
});

export const deleteMany = async (
	resource: string,
	params: DeleteManyParams,
): Promise<DeleteManyResult> => {
	const { ids } = paramsSchema.parse(params);
	switch (resource) {
		case "users": {
			const result = await trpc.admin.users.deleteMany.mutate({ ids });
			return { data: result };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
