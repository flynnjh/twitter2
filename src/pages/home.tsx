import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import Tweet from "../components/Tweet";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const tweet = trpc.tweet.create.useMutation();
  const [tweetText, setTweetText] = useState("");

  const homeTimeline = trpc.user.getHomeTimeline.useQuery();

  const handleCreateTweet = async () => {
    if (!session?.user?.id) {
      return;
    }
    const newTweet = tweet.mutateAsync({ text: tweetText });
    setTweetText("");
  };

  return (
    <>
      <Layout>
        <div className="mt-6 flex h-full w-full flex-col overflow-auto rounded-md border md:w-1/2">
          {/* <div className="shadow-blue-gray-100 flex h-full w-full flex-col overflow-auto rounded-lg bg-gray-50 md:shadow-lg"> */}
          <div className="flex h-1/5 flex-col bg-[#E9F5FD] p-4">
            <textarea
              className="mb-4 ml-auto w-full flex-1 resize-none rounded-md border-2 border-[#A8DCFB] bg-white p-2 text-lg text-gray-800 placeholder:pt-9 placeholder:font-light"
              value={tweetText}
              placeholder="What's happening?"
              onChange={(e) => setTweetText(e.target.value)}
              onKeyDown={(e) =>
                e.key == "Enter" && e.shiftKey
                  ? tweetText
                    ? handleCreateTweet()
                    : null
                  : null
              }
            ></textarea>
            <div className="flex flex-row items-center">
              <h1 className="ml-auto mr-4 font-light text-[#9ca8b2]">
                {140 - tweetText.length}
              </h1>
              <button
                className="flex h-8 flex-row items-center justify-center gap-2 rounded-md bg-[#41B3F7] py-5 px-4 text-white"
                onClick={() => {
                  handleCreateTweet();
                }}
              >
                <i className="Icon Icon--large Icon--tweet h-8" />
                <h1 className="">Tweet</h1>
              </button>
            </div>
          </div>
          <div className="flex h-96 w-full flex-col">
            {homeTimeline?.data?.slice(0).map((tweet) => {
              return (
                <div
                  className="flex h-full w-full items-center justify-center border-b-2"
                  key={tweet.id}
                >
                  <Tweet tweet={tweet} user={tweet.user} key={tweet.id} />
                </div>
              );
            })}
          </div>
        </div>
        {!session ? <AuthShowcase /> : null}
      </Layout>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {secretMessage && (
        <p className="text-2xl text-blue-500">{secretMessage}</p>
      )}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
