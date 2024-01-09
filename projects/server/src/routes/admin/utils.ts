import { z } from "zod";

const sortOrderSchema = z.enum(["asc", "desc"]);

export const listSchema = z.object({
	take: z.number(),
	skip: z.number(),
	orderBy: z.string(),
	order: sortOrderSchema,
});
