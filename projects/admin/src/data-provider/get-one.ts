import type { GetOneParams, GetOneResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	id: z.string().uuid(),
});

export const getOne = async (
	resource: string,
	params: GetOneParams,
): Promise<GetOneResult> => {
	const { id } = paramsSchema.parse(params);
	switch (resource) {
		case "users": {
			const data = await trpc.admin.users.get.query({ id });
			return { data };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
