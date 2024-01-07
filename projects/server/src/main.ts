import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import {
	fastifyTRPCPlugin,
	type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { appRouter, type AppRouter } from "./router.js";
import { createContext } from "./context.js";
import { prisma } from "./prisma.js";

const server = fastify({
	maxParamLength: 5_000,
	bodyLimit: 1_000_000,
});

await server.register(cors, {
	origin: ["http://localhost:8000", "http://localhost:8001"],
	credentials: true,
});

await server.register(cookie);

await server.register(fastifyTRPCPlugin, {
	prefix: "/trpc",
	trpcOptions: {
		router: appRouter,
		createContext,
	},
} satisfies FastifyTRPCPluginOptions<AppRouter>);

// Healthcheck endpoint
server.get("/", async (_, res) => {
	try {
		await prisma.$executeRaw`SELECT 1;`;
		return { ok: true };
	} catch (error) {
		console.error(error);
		return res.status(500).send();
	}
});

await server.listen({ port: 3000, host: "0.0.0.0" });

console.log("server listening on port 3000");
