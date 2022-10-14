import { useUserThemeContext } from "../../context";
import { Check } from "../icons";

const SidebarThemeColors: React.FC = () => {
  const { theme, themesColors, changeThemeColor } = useUserThemeContext();
  return (
    <>
      <h2 style={{ margin: "2rem" }}>Colors</h2>
      <div className='theme-container'>
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
    </>
  );
};

export default SidebarThemeColors;
