import { ReactElement, FC } from "react";
import { Sidebar, Navbar } from "../";

interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      {children}
    </main>
  );
};

export default UserLayout;
