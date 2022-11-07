import { protectedProcedure, publicProcedure, router } from "../trpc";

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
});
