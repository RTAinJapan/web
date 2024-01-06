import type { UpdateParams, UpdateResult } from "react-admin";
import { trpc } from "../trpc";

export const update = async (
	resource: string,
	{ id, data }: UpdateParams,
): Promise<UpdateResult> => {
	switch (resource) {
		case "users":
			const result = await trpc.admin.users.update.mutate({ id, data });
			return {
				data: result,
			};
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
