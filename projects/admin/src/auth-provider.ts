import { z } from "zod";
import type { AuthProvider } from "react-admin";
import { trpc } from "./trpc";
import { TRPCClientError } from "@trpc/client";

const loginParamsSchema = z.object({
	email: z.string().email(),
});

const trpcErrorSchema = z.object({
	code: z.string(),
	httpStatus: z.number().int(),
	path: z.string(),
});

export const authProvider: AuthProvider = {
	login: async (params) => {
		const { email } = loginParamsSchema.parse(params);
		const callbackUrl = new URL(window.location.origin);
		callbackUrl.hash = "/auth-callback";
		await trpc.authentication.initialize.mutate({
			email,
			callbackUrl: callbackUrl.href,
		});
	},

	handleCallback: async () => {
		const searchParams = new URLSearchParams(window.location.search);
		window.location.search = "";

		const token = searchParams.get("token");
		if (!token) {
			return;
		}

		await trpc.authentication.verifyToken.mutate({ token });
	},

	// eslint-disable-next-line @typescript-eslint/require-await
	checkError: async (error) => {
		if (!(error instanceof TRPCClientError)) {
			return;
		}
		const errorData = trpcErrorSchema.parse(error.data);
		if (errorData.code === "UNAUTHORIZED") {
			throw new Error("not signed in");
		}
		return;
	},

	checkAuth: async () => {
		const signedIn = await trpc.validateSession.query();
		if (!signedIn) {
			throw new Error("not signed in");
		}
	},

	logout: async () => {
		try {
			const signedIn = await trpc.validateSession.query();
			if (!signedIn) {
				return;
			}
			await trpc.authentication.signOut.mutate();
		} catch (error) {
			console.error(error);
		}
	},

	getPermissions: () => {
		return Promise.resolve("admin");
	},
};
