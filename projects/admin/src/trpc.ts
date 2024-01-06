import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/router";

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "http://localhost:3000/trpc",
			fetch: (input, init) => fetch(input, { ...init, credentials: "include" }),
		}),
	],
});
