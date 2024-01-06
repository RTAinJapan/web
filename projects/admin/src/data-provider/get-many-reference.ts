import type {
	GetManyReferenceParams,
	GetManyReferenceResult,
} from "react-admin";

export const getManyReference = async (
	resource: string,
	_: GetManyReferenceParams,
): Promise<GetManyReferenceResult> => {
	switch (resource) {
		case "users":
			throw new Error("not implemented");
		default:
			throw new Error(`unknown resource ${resource}`);
	}
};
