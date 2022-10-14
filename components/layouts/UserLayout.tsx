import { ReactElement, FC } from "react";
import { Sidebar, Navbar } from "../";

interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
    </div>
  );
};

export default UserLayout;
