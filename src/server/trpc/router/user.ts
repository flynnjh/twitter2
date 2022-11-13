import { protectedProcedure, publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";
import { User } from "@prisma/client";
import { z } from "zod";

export const userRouter = router({
  getIdByUsername: publicProcedure
    .input(z.object({ username: z.string().nullish() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { username: input.username as string },
        select: { id: true },
      });
    }),
  getUserById: publicProcedure
    .input(z.object({ userId: z.string().nullish() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.userId as string },
      });
    }),
  follow: protectedProcedure
    .input(z.object({ target: z.string().nullish() }))
    .mutation(({ input, ctx }) => {
      if (input.target === ctx.session.user.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      return ctx.prisma.userFollows.create({
        data: {
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          target: {
            connect: {
              id: input.target as string,
            },
          },
        },
      });
    }),
});
