import Link from "next/link";
import { signOut } from "next-auth/react";
import { HomeIcon } from "../icons";
import { useUserThemeContext } from "../../context";
import { NavbarWrapper } from "../../styles/wrappers";

const Navbar: React.FC = () => {
  const { toggleSidebar } = useUserThemeContext();
  return (
    <NavbarWrapper>
      <div className='navbar'>
        <Link href={"/"}>
          <a>
            <HomeIcon size={22} />
          </a>
        </Link>
        <div className='items-container'>
          <button className='nav-item' onClick={() => signOut()}>
            Logout
          </button>
          <button className='nav-item' onClick={toggleSidebar}>
            Styles
          </button>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
