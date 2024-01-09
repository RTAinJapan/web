/* eslint-disable @typescript-eslint/require-await */
import type { CreateParams, CreateResult } from "react-admin";

export const create = async (
	resource: string,
	_: CreateParams,
): Promise<CreateResult> => {
	switch (resource) {
		case "users":
			throw new Error("not allowed");
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
