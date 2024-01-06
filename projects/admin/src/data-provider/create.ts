import type { CreateParams, CreateResult } from "react-admin";

export const create = async (
	resource: string,
	_: CreateParams,
): Promise<CreateResult> => {
	switch (resource) {
		case "users":
			throw new Error("not implemented");
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
