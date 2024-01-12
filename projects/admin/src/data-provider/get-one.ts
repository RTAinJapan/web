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
			const res = await trpc.admin.users.get.query({ id });
			return {
				data: res,
			};
		}
		case "events": {
			const res = await trpc.admin.events.get.query({ id });
			return {
				data: res,
			};
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
