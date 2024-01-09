import type { GetListParams, GetListResult } from "react-admin";
import { trpc } from "../trpc.js";
import { lowercase } from "./data-provider.js";

export const getList = async (
	resource: string,
	params: GetListParams,
): Promise<GetListResult> => {
	const query = {
		order: lowercase(params.sort.order),
		orderBy: params.sort.field,
		skip: (params.pagination.page - 1) * params.pagination.perPage,
		take: params.pagination.perPage,
	};
	switch (resource) {
		case "users": {
			const res = await trpc.admin.users.list.query(query);
			return { data: res.data, total: res.count };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
