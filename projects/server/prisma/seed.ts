import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
	data: {
		email: "dev-admin@example.com",
		userRoles: {
			create: {
				role: Role.ADMIN,
			},
		},
	},
});
