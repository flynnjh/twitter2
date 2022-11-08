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
    <div className="flex h-full w-full flex-col bg-white p-4">
      <div
        className={"flex h-full flex-row gap-2 " + (props.expanded ? "" : "")}
      >
        <div className="flex pt-1">
          <img
            className="h-12 w-12 rounded-md"
            src={props.user?.image as string}
          ></img>
        </div>
        <div className={"flex flex-col pl-1"}>
          <div
            className={
              "flex " + (props.expanded ? "flex-col" : "flex-row items-center")
            }
          >
            <h1
              className={"text-base " + (props.expanded ? "text-xl" : "pr-1")}
            >
              {props.user?.name}
            </h1>
            <h1
              className={
                "text-base font-light text-[#9ca8b2] " +
                (props.expanded ? "" : "")
              }
            >
              @{props.user?.username}
            </h1>
          </div>
          <p className="pb-2 pt-1">{tweet.text}</p>
          <p className="text-sm">{tweet.createdAt.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
