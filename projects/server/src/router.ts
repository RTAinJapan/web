import { registrationRouter } from "./routes/registration.js";
import { router } from "./trpc.js";

export const appRouter = router({
  registration: registrationRouter,
});

export type AppRouter = typeof appRouter;
