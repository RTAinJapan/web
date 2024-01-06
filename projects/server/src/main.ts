import fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { appRouter, type AppRouter } from "./router.js";
import { createContext } from "./context.js";

const server = fastify({
  maxParamLength: 5_000,
  bodyLimit: 1_000_000,
});

server.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});
server.register(cookie);

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError: ({ error, path }) => {
      console.error(`error in ${path}:`, error);
    },
  },
} satisfies FastifyTRPCPluginOptions<AppRouter>);

await server.listen({ port: 3000 });

console.log("server listening on port 3000");
