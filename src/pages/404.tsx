import React, { useState } from "react";

import Layout from "../components/layout/Layout";
import Link from "next/link";
import Tweet from "../components/Tweet";

const you = () => {
  return (
    <>
      <Layout>
        <div className="shadow-blue-gray-100 flex h-full w-full flex-col overflow-auto rounded-lg bg-gray-50 md:shadow-lg">
          <h1 className="text-bold px-28 pt-28 text-7xl">404</h1>
          <h1 className="text-bold px-28 pt-9 text-3xl">
            The page you were looking for could not found.
          </h1>
          <Link
            className="px-28 pt-9 text-3xl text-sky-400 hover:underline"
            href="/home"
          >
            Go back home?
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default you;
