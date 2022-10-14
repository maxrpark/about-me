import styled from "styled-components";

const NavbarWrapper = styled.nav`
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 0.5rem;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  .navbar a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s linear;
  }
  .navbar a:hover {
    opacity: 0.6;
  }
  .items-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .nav-item {
    border: none;
    background: transparent;
    cursor: pointer;
    color: ${(props) => props.theme.textColorSecondary};
    transition: all 0.2s linear;
    position: relative;
  }
  .nav-item::after {
    position: absolute;
    content: "";
    border-bottom: 0.1rem solid ${(props) => props.theme.textColorSecondary};
    height: 100%;
    width: 0;
    top: 2px;
    left: 0;
    transition: all 0.2s linear;
  }
  .nav-item:hover.nav-item::after {
    width: 100%;
  }
`;

export default NavbarWrapper;
