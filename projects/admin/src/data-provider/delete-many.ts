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
			const deleted: string[] = [];
			await Promise.all(
				ids.map(async (id) => {
					try {
						const res = await trpc.admin.users.delete.mutate({ id });
						deleted.push(res.id);
					} catch (error) {
						console.error(error);
					}
				}),
			);
			return { data: deleted };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
