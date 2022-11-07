import React, { ReactNode } from "react";

import Head from "next/head";
import NavBar from "./NavBar";

interface Props {
  children?: ReactNode;
}

const Layout = ({ children, ...props }: Props) => {
  return (
    <>
      <Head>
        <title>twitter2</title>
      </Head>
      <div className="flex h-screen w-screen flex-col">
        <NavBar />
        <main className="flex h-full w-full items-center justify-center bg-[#F5F8FA]">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
