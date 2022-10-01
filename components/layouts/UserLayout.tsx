import { ReactElement, FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import { HomeIcon } from "../icons";

import React from "react";
import { useUserThemeContext } from "../../context/userThemeContext";
interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  const {
    isSidebarOpen,
    themesColors,
    themesLayouts,
    toggleSidebar,
    changeThemeColor,
    changeThemeLayout,
  } = useUserThemeContext();

  return (
    <Wrapper>
      <nav>
        <Link href={"/"}>
          <a>
            <HomeIcon />
          </a>
        </Link>
        ||
        <button onClick={() => signOut()}>Sign out</button>;
        <div onClick={toggleSidebar}>Change Theme</div>
      </nav>
      <aside className={`${isSidebarOpen ? "sidebar-open" : ""} sidebar`}>
        <div className='content'>
          sidebar
          <div onClick={toggleSidebar}>close</div>
          {themesColors.map((color: any) => {
            return (
              <h2 key={color.id} onClick={() => changeThemeColor(color.name)}>
                {color.name}
              </h2>
            );
          })}
          <h2 style={{ margin: "2rem" }}>Layouts</h2>
          {themesLayouts.map((theme: any) => {
            return (
              <h2 key={theme.id} onClick={() => changeThemeLayout(theme.name)}>
                {theme.name}
              </h2>
            );
          })}
        </div>
      </aside>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
  .sidebar {
    height: 100vh;
    width: 100%;
    position: absolute;
    /* background: rgba(0, 0, 0, 0.475); */
    top: 0;
    right: 0;
    z-index: -10;
    opacity: 0;
    transition: 0.3s linear all;
  }
  .sidebar-open {
    opacity: 1;
    z-index: 10;
  }
  .content {
    /* position: absolute; */
    height: 100vh;
    width: 40%;
    margin-left: auto;
    transition: 0.3s linear all;
    background: blue;
    transform: translateX(100%);
  }
  .sidebar-open .content {
    animation: sideBarAnimation 0.3s 0.2s forwards;
  }

  @keyframes sideBarAnimation {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default UserLayout;
