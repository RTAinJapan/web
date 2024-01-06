import type { DeleteParams, DeleteResult } from "react-admin";
import { trpc } from "../trpc";

export const deleteMethod = async (
	resource: string,
	params: DeleteParams,
): Promise<DeleteResult> => {
	switch (resource) {
		case "users":
			const result = await trpc.admin.users.delete.mutate(params.id);
			return {
				data: result,
			};
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
