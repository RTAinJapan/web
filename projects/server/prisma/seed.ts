import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
	data: {
		email: "dev-admin@example.com",
		username: "dev-admin",
		userRoles: {
			create: {
				role: Role.ADMIN,
			},
		},
	},
});

await prisma.user.create({
	data: {
		email: "dev-normal@example.com",
		username: "dev-normal",
	},
});
