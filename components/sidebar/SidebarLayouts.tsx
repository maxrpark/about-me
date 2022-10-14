import { useUserThemeContext } from "../../context";
import { Check } from "../icons";

const SidebarLayouts: React.FC = () => {
  const {
    layout: currentLayout,
    themesLayouts,
    changeThemeLayout,
  } = useUserThemeContext();
  return (
    <>
      {" "}
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
    </>
  );
};

export default SidebarLayouts;
