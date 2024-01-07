import { createRandomToken } from "../src/utils/random-token.js";
import { expect, test } from "vitest";

for (let i = 0; i < 200; i++) {
	test(String(i), () => {
		const token = createRandomToken(i);
		expect(token.length).toBeLessThanOrEqual(i);
	});
}
