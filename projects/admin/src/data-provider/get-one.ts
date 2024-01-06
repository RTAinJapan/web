import type { GetOneParams, GetOneResult } from "react-admin";
import { trpc } from "../trpc";

export const getOne = async (
	resource: string,
	{ id }: GetOneParams,
): Promise<GetOneResult> => {
	switch (resource) {
		case "users":
			const data = await trpc.admin.users.get.query({ id });
			return { data };
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
