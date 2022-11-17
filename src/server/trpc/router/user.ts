import { User, tweet } from "@prisma/client";
import { protectedProcedure, publicProcedure, router } from "../trpc";

import { TRPCError } from "@trpc/server";
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
  getHomeTimeline: protectedProcedure.query(async ({ ctx }) => {
    var timeline: any[] = [];
    const following = await ctx.prisma.userFollows.findMany({
      where: { userId: ctx.session.user.id },
    });
    for (const i in following) {
      // loop through userTweets, add those to new array
      let userTweets = await ctx.prisma.tweet.findMany({
        where: { userId: following[i]?.targetId },
        include: { user: true },
      });
      for (const x in userTweets) {
        timeline.push(userTweets[x]);
      }
    }
    // sort timeline by date created
    timeline.sort((objA, objB) => {
      return Date.parse(objB.createdAt) - Date.parse(objA.createdAt);
    });
    return timeline;
  }),
});
