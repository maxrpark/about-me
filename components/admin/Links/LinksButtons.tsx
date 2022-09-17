import { useGlobalContext } from "../../../context/globalContext";
import { LinkItemInt } from "../../../ts/interfaces";
const LinkButtons: React.FC = ({}) => {
  const { profileData, selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className='btns-container'>
      {profileData.links.map((link: LinkItemInt) => {
        return (
          <div className='btn' key={link.id}>
            {link.name}

            <span onClick={() => selectItem(link.id, "links")}>Edit</span>
          </div>
        );
      })}
      <div className='btn' onClick={() => selectOrCreateItem("links")}>
        Add now button
      </div>
    </div>
  );
};

export default LinkButtons;
