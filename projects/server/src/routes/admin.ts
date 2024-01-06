import { router } from "../trpc.js";
import { usersRouter } from "./admin/users.js";

export const adminRouter = router({
	users: usersRouter,
});
