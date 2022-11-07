import { User, tweet } from "@prisma/client";

import React from "react";
import { userAgent } from "next/server";

interface Props {
  tweet: tweet;
  user?: User;
  key: string;
  expanded?: boolean;
}

const Tweet = ({ tweet, ...props }: Props) => {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <h1 className="text-xl">{props.user?.name}</h1>
      <h1 className="pb-8">@{props.user?.username}</h1>

      <h1>{tweet.text}</h1>
      <h1>{tweet.createdAt.toLocaleString()}</h1>
    </div>
  );
};

export default Tweet;
