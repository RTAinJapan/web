import { z } from "zod";
import { publicProcedure, router } from "../trpc.js";
import { prisma } from "../prisma.js";
import { createRandomToken } from "../utils/random-token.js";
import { TRPCError } from "@trpc/server";

export const registrationRouter = router({
  initialize: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existingUser) {
        console.log("User with this email already exists");
        return;
      }

      const token = createRandomToken(255);

      await prisma.registrationToken.create({
        data: { email: input.email, token },
      });

      console.log(
        `https://localhost:3000/verify-registration-token?token=${token}`,
      );
    }),

  verifyToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const registrationToken = await prisma.registrationToken.findUnique({
        where: { token: input.token },
      });
      if (!registrationToken) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "registration token not found",
        });
      }

      await prisma.registrationToken.delete({
        where: { token: input.token },
      });

      const sessionToken = createRandomToken(255);

      await prisma.user.create({
        data: {
          email: registrationToken.email,
          Session: {
            create: {
              token: sessionToken,
            },
          },
        },
      });

      ctx.setSessionToken(sessionToken);
    }),
});
