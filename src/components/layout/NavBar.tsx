import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  link?: ReactNode;
  className?: String;
}

const NButton = ({ children, ...props }: Props) => {
  return (
    <Link href={"" + props.link}>
      <div
        className={
          "flex h-8 flex-row items-center justify-center gap-2 pl-8 " +
          props.className
        }
      >
        {children}
      </div>
    </Link>
  );
};

const NavBar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex w-screen flex-row items-center border-b-2 py-2 px-4 text-[#66757F]">
      {/* Left Navigation  */}
      <div className="mr-auto flex flex-1 items-center">
        <NButton link="/home">
          <i className="Icon Icon--large Icon--home h-8" />
          <h1>Home</h1>
        </NButton>
        <NButton link={"/404"}>
          <i className="Icon Icon--large Icon--notifications h-8" />
          <h1>Notifications</h1>
        </NButton>
        <NButton link={"/404"}>
          <i className="Icon Icon--large Icon--message h-8" />
          <h1>Messages</h1>
        </NButton>
      </div>
      {/* <!-- Logo --> */}
      <div className="mx-12">
        <h1 className="hero-logo-navbar text-4xl">🕊</h1>
      </div>
      {/* <!-- Right Navigation --> */}
      <div className="ml-auto flex flex-1 items-center justify-end gap-5">
        <Link href={"/" + session?.user?.username}>
          <img
            className="h-10 w-10 rounded-md"
            src={session?.user?.image as string}
          ></img>
        </Link>
        <Link href={"/404"}>
          <div className="flex h-8 flex-row items-center justify-center gap-2 rounded-md bg-[#41B3F7] py-5 px-4 text-white">
            <i className="Icon Icon--large Icon--tweet h-8" />
            <h1 className="">Tweet</h1>
          </div>
        </Link>
      </div>
    </nav>
    // <div className="flex w-full flex-row justify-between border-b-2 py-2">
    //   <div className="flex h-full flex-row">
    //     <NButton link={"/home"}>
    //       <h1>🏠</h1>
    //       <h1>Home</h1>
    //     </NButton>
    //     <NButton link={"/user/" + session?.user?.id}>
    //       <h1>Timeline</h1>
    //     </NButton>
    //     <NButton link={"/bookmarks"}>
    //       <h1>Bookmarks</h1>
    //     </NButton>
    //   </div>
    //   <h1 className="flex text-4xl text-black">🔏</h1>
    //   <div className="flex h-full flex-row items-center gap-3">
    //     <div className="ml-auto flex h-full w-10 items-center justify-center">
    //       <img
    //         className="h-10 w-10 rounded-md"
    //         src={session?.user?.image as string}
    //       />
    //     </div>
    //     <NButton link={"/x/settings"}>
    //       <h1 className="pr-6">Tweet</h1>
    //     </NButton>
    //   </div>
    // </div>
  );
};

export default NavBar;
