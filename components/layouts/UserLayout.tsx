import { ReactElement, FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { signOut } from "next-auth/react";
import { Check, HomeIcon } from "../icons";

import React from "react";
import { useUserThemeContext } from "../../context/userThemeContext";
interface Props {
  children: ReactElement;
}
const UserLayout: FC<Props> = ({ children }) => {
  const {
    layout: currentLayout,
    theme,
    isSidebarOpen,
    themesColors,
    themesLayouts,
    toggleSidebar,
    changeThemeColor,
    changeThemeLayout,
    saveChanges,
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
      <aside
        onClick={saveChanges}
        className={`${isSidebarOpen ? "sidebar-open" : ""} sidebar`}
      >
        <div className='content' onClick={(e) => e.stopPropagation()}>
          sidebar
          <div onClick={toggleSidebar}>close</div>
          <div className='theme-color'>
            {themesColors.map((color: any) => {
              return (
                <div
                  className={`color-icon`}
                  style={{ background: color.color }}
                  key={color.id}
                  onClick={() => changeThemeColor(color.name)}
                >
                  {color.name === theme && <Check size={25} />}
                </div>
              );
            })}
          </div>
          <h2 style={{ margin: "2rem" }}>Layouts</h2>
          <div className='layout-container'>
            {themesLayouts.map((layout: any) => {
              return (
                <button
                  className={`${layout.name} single-layout `}
                  key={layout.id}
                  onClick={() => changeThemeLayout(layout.name)}
                >
                  {layout.name}
                  {layout.name === currentLayout && (
                    <span className='check-icon'>
                      <Check size={25} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={saveChanges}
            style={{ marginTop: "2rem" }}
            className='btn'
          >
            save and close
          </button>
        </div>
      </aside>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  position: relative;
  overflow: hidden;
  nav {
    position: absolute;
    z-index: 1;
  }
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
    background: ${(props) => props.theme.textColorSecondary};
    color: ${(props) => props.theme.sidebarText};
    transform: translateX(100%);
  }
  .sidebar-open .content {
    animation: sideBarAnimation 0.3s 0.2s forwards;
  }
  .theme-color {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem;
  }
  .layout-container {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
  .single-layout {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 20px;
    transition: var(--transition-1);
    background: ${(props) => props.theme.sidebarText};
    border: none;
  }

  .minimalist.single-layout {
    color: ${(props) => props.theme.sidebarText};
  }
  .check-icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 8px;
    border-radius: 50%;
    background: var(--theme-two-primary-light);
    background: ${(props) => props.theme.buttonColor};
  }

  .color-icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-content: center;
    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.bgColor};
    transition: all 0.3s linear;
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
