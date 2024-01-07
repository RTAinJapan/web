import { randomBytes } from "crypto";

export const createRandomToken = (length: number) => {
	const bytesLength = (length * 3) / 4;
	return randomBytes(bytesLength).toString("base64url");
};
