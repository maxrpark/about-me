import { ReactElement, FC } from "react";
import Link from "next/link";

import React from "react";
interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <nav>
        <Link href={"/"}>Home</Link>
        <Link href={"/change"}>change</Link>
      </nav>
      {children}
    </>
  );
};

export default UserLayout;
