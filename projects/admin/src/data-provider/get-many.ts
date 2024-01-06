import type { GetManyParams, GetManyResult } from "react-admin";
import { trpc } from "../trpc";

export const getMany = async (
	resource: string,
	{ ids }: GetManyParams,
): Promise<GetManyResult> => {
	switch (resource) {
		case "users":
			const data = await Promise.all(
				ids.map((id) => {
					if (typeof id === "string") {
						return trpc.admin.users.get.query({ id });
					}
					throw new Error(`invalid id ${id}`);
				}),
			);
			return { data };
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
