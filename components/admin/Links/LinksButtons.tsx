import { useGlobalContext } from "../../../context/globalContext";

const LinkButtons: React.FC = ({}) => {
  const { profileData, selectItem, addNewItem } = useGlobalContext();
  return (
    <div className='btns-container'>
      {profileData.links.map((link: any) => {
        return (
          <div className='btn' key={link.id}>
            {link.name}

            <span onClick={() => selectItem(link.id, "links")}>Edit</span>
          </div>
        );
      })}
      <div className='btn' onClick={() => addNewItem("links")}>
        Add now button
      </div>
    </div>
  );
};

export default LinkButtons;
