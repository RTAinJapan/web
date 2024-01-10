import { router } from "../trpc.js";
import { eventsRouter } from "./admin/events.js";
import { usersRouter } from "./admin/users.js";

export const adminRouter = router({
	users: usersRouter,
	events: eventsRouter,
});
