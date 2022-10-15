import styled from "styled-components";

const SidebarWrapper = styled.aside`
  .sidebar {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: fixed;
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
    height: 100vh;
    width: 50%;
    margin-left: auto;
    transition: 0.3s linear all;
    background: ${(props) => props.theme.textColorSecondary};
    color: ${(props) => props.theme.sidebarText};
    transform: translateX(100%);
    padding: 2rem 0;
  }
  .sidebar-open .content {
    animation: sideBarAnimation 0.3s 0.2s forwards;
  }
  .theme-container,
  .layout-container {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem;
  }
  .layout-container {
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
    border-radius: 0;
    background: transparent;
    border: 1px solid;
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

  /* reppeted styles */

  .btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 8px;
    gap: 8px;
    width: 90%;
    height: 36px;
    border: none;
    margin: 0 auto;
    background: #59ffa0; /*todo change color*/
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25); /*todo  variable*/
    border-radius: 5px;
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

export default SidebarWrapper;
