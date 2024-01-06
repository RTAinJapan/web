import type { DeleteManyParams, DeleteManyResult } from "react-admin";
import { trpc } from "../trpc";

export const deleteMany = async (
	resource: string,
	params: DeleteManyParams,
): Promise<DeleteManyResult> => {
	switch (resource) {
		case "users":
			const result = await trpc.admin.users.deleteMany.mutate({
				ids: params.ids,
			});
			return {
				data: result,
			};
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
