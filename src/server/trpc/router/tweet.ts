import { protectedProcedure, publicProcedure, router } from "../trpc";

import { z } from "zod";

export const tweetRouter = router({
  create: protectedProcedure
    .input(z.object({ text: z.string().nullish() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.tweet.create({
        data: {
          text: input?.text as string,
          userId: ctx.session.user.id,
        },
      });
    }),
  getAllbyUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.tweet.findMany({
        where: { userId: input.userId as string },
        orderBy: { createdAt: "desc" },
      });
    }),
});
