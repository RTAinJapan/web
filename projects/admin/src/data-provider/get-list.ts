import type { GetListParams, GetListResult } from "react-admin";
import { trpc } from "../trpc.js";
import { lowercase } from "./data-provider.js";

export const getList = async (
	resource: string,
	{ pagination, sort }: GetListParams,
): Promise<GetListResult> => {
	switch (resource) {
		case "users": {
			const res = await trpc.admin.users.list.query({
				order: lowercase(sort.order),
				orderBy: sort.field,
				skip: (pagination.page - 1) * pagination.perPage,
				take: pagination.perPage,
			});
			return {
				data: res.data,
				total: res.count,
			};
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
