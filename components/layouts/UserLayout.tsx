import { ReactElement, FC } from "react";
import { Sidebar, Navbar } from "../";

interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default UserLayout;
