import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Layout from "../components/layout/Layout";
import Tweet from "../components/Tweet";
import { User } from "@prisma/client";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const you = () => {
  const router = useRouter();

  const userId = trpc.user.getIdByUsername.useQuery({
    username: router.query.username as string,
  }).data?.id;

  const tweets = trpc.tweet.getAllbyUser.useQuery(
    { userId: userId as string },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const user = trpc.user.getUserById.useQuery(
    { userId: userId as string },
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return (
    <>
      <Layout>
        <div className="shadow-blue-gray-100 flex h-full w-full flex-col overflow-auto rounded-lg bg-gray-50 md:shadow-lg">
          {/* <div className="z-10 flex items-center gap-4 px-9 py-12 shadow-md md:flex-row md:px-24">
            <img
              className="h-16 w-16 rounded-full"
              src={user.data?.image as string}
            />
            <div className="text-center text-4xl md:text-left">
              <h1>{user.data?.name}</h1>
              <h1>@{user.data?.username} has been thinking about...</h1>
            </div>
          </div> */}
          <div className="bg-blue-gray-50 flex h-full flex-col items-center overflow-auto border border-gray-200">
            <div className="flex h-96 w-full flex-col">
              {tweets?.data?.slice(0).map((tweet) => (
                <div
                  className="flex w-full items-center justify-center md:py-1"
                  key={tweet.id}
                >
                  <Tweet
                    tweet={tweet}
                    user={user?.data as User}
                    key={tweet.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default you;
