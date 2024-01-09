import type { GetManyParams, GetManyResult } from "react-admin";
import { trpc } from "../trpc";
import { z } from "zod";

const paramsSchema = z.object({
	ids: z.array(z.string().uuid()),
});

export const getMany = async (
	resource: string,
	params: GetManyParams,
): Promise<GetManyResult> => {
	console.log(params);
	const { ids } = paramsSchema.parse(params);

	switch (resource) {
		case "users": {
			const data = await Promise.all(
				ids.map((id) => {
					return trpc.admin.users.get.query({ id });
				}),
			);
			return { data };
		}
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
