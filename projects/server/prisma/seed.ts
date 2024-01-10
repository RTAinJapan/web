import { MarathonType, PrismaClient, Role } from "@prisma/client";

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

await prisma.event.create({
	data: {
		name: "RTA in Japan Sample 1995",
		startsAt: new Date("1995-08-08T12:00:00+0900"),
		endsAt: new Date("1995-08-15T18:00:00+0900"),
		eventMarathonTypes: {
			createMany: {
				data: [
					{ marathonType: MarathonType.ONLINE },
					{ marathonType: MarathonType.ONSITE },
				],
			},
		},
	},
});
