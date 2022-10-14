import { useUserThemeContext } from "../../context";
import { SidebarWrapper } from "../../styles/wrappers";
import { SidebarLayouts, SidebarThemeColors } from "../";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, saveChanges } = useUserThemeContext();
  return (
    <SidebarWrapper>
      <section
        onClick={saveChanges}
        className={`${isSidebarOpen ? "sidebar-open" : ""} sidebar`}
      >
        <div className='content' onClick={(e) => e.stopPropagation()}>
          <SidebarThemeColors />
          <SidebarLayouts />
          <button
            onClick={saveChanges}
            style={{ marginTop: "2rem" }}
            className='btn'
          >
            save and close
          </button>
        </div>
      </section>
    </SidebarWrapper>
  );
};

export default Sidebar;
