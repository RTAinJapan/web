import type { DataProvider } from "react-admin";
import { getList } from "./get-list";
import { getOne } from "./get-one";
import { getMany } from "./get-many";
import { getManyReference } from "./get-many-reference";
import { create } from "./create";
import { update } from "./update";
import { updateMany } from "./update-many";
import { deleteMethod } from "./delete";
import { deleteMany } from "./delete-many";

export const lowercase = <T extends string>(str: T) =>
	str.toLowerCase() as Lowercase<T>;

export const dataProvider: DataProvider = {
	getList,
	getOne,
	getMany,
	getManyReference,
	create,
	update,
	updateMany,
	delete: deleteMethod,
	deleteMany,
};
