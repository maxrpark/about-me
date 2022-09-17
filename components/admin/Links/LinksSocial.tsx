import { useGlobalContext } from "../../../context/globalContext";
import { icons, IconType } from "../../icons";

const LinksSocial: React.FC = () => {
  const { profileData, selectItem, addNewItem } = useGlobalContext();
  return (
    <div className='btns-container social-icons'>
      {profileData.social.map((link: any) => {
        const { name } = link;
        const SocialIcon = icons[name as IconType];
        return (
          <div key={link.id} onClick={() => selectItem(link.id, "social")}>
            <SocialIcon />
          </div>
        );
      })}
      <div className='btn' onClick={() => addNewItem("social")}>
        +
      </div>
    </div>
  );
};

export default LinksSocial;
