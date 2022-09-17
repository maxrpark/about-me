import { useGlobalContext } from "../../../context/globalContext";
import { icons, IconType } from "../../icons";
import { LinkItemInt } from "../../../ts/interfaces";

const LinksSocial: React.FC = () => {
  const { profileData, selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className='btns-container social-icons'>
      {profileData.social.map((link: LinkItemInt) => {
        const { name } = link;
        const SocialIcon = icons[name as IconType];
        return (
          <div key={link.id} onClick={() => selectItem(link.id, "social")}>
            <SocialIcon />
          </div>
        );
      })}
      <div className='btn' onClick={() => selectOrCreateItem("social")}>
        +
      </div>
    </div>
  );
};

export default LinksSocial;
