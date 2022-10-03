import { useGlobalContext } from "../../../context/globalContext";
import { LinkItemInt } from "../../../ts/interfaces";
import { Pencil } from "../../icons";
import { SingleLink } from "../../";

interface Props {
  data: LinkItemInt[];
  classType: string;
}

const EditLinks: React.FC<Props> = ({ data, classType }) => {
  const { selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className={`${classType}-container`}>
      {data.map((link: LinkItemInt) => {
        const { id, name } = link;
        return (
          <div
            onClick={() => selectItem(id, classType)}
            className={`${classType}-btn`}
            key={id}
          >
            {classType === "social" ? (
              <SingleLink classType='social' name={name} />
            ) : (
              <>
                <SingleLink name={name} />
                <span className='pencil'>
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
