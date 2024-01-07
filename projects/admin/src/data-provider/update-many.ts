import type { UpdateManyParams } from "react-admin";

// eslint-disable-next-line @typescript-eslint/require-await
export const updateMany = async (resource: string, _: UpdateManyParams) => {
	switch (resource) {
		case "users":
			throw new Error("not implemented");
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
