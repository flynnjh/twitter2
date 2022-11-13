import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const tweet = trpc.tweet.create.useMutation();
  const [tweetText, setTweetText] = useState("");

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
        <div className="flex h-full w-full p-28">
          <textarea
            className="ml-auto h-full w-full flex-1 resize-none bg-transparent text-2xl text-gray-800"
            value={tweetText}
            placeholder="What are you thinking about, bud?"
            onChange={(e) => setTweetText(e.target.value)}
            onKeyDown={(e) =>
              e.key == "Enter" && e.shiftKey
                ? tweetText
                  ? handleCreateTweet()
                  : null
                : null
            }
          ></textarea>
        </div>
        {/* <h1 className="text-7xl">🥵</h1> */}
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
