import { useGlobalContext } from "../../../context/globalContext";
import { LinkItemInt } from "../../../ts/interfaces";
import { icons, IconType, Pencil } from "../../icons";

interface Props {
  data: LinkItemInt[];
  classType: string;
}

const EditLinks: React.FC<Props> = ({ data, classType }) => {
  const { selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className={`${classType}-container`}>
      {data.map((link: LinkItemInt) => {
        const { name } = link;
        let SocialIcon: any;
        if (classType === "social") {
          SocialIcon = icons[name as IconType];
        }
        return (
          <div className={`${classType}-btn`} key={link.id}>
            {classType === "social" ? (
              <SocialIcon
                key={link.id}
                onClick={() => selectItem(link.id, "social")}
              />
            ) : (
              <>
                {name}
                <span
                  className='pencil'
                  onClick={() => selectItem(link.id, classType)}
                >
                  <Pencil />
                </span>
              </>
            )}
          </div>
        );
      })}
      <div
        className={`${classType}-add`}
        onClick={() => selectOrCreateItem(classType)}
      >
        {classType === "social" ? "+" : "Add now button"}
      </div>
    </div>
  );
};

export default EditLinks;
