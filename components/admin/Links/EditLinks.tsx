import { useGlobalContext } from "../../../context/globalContext";
import { LinkItemInt } from "../../../ts/interfaces";
import { Pencil } from "../../icons";
import { SingleLink } from "../../";

interface Props {
  data: LinkItemInt[];
}

const EditLinks: React.FC<Props> = ({ data }) => {
  let classType = data[0].type!;

  const { selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className={`${classType}-container`}>
      {data.map((link: LinkItemInt) => {
        const { _id, name } = link;
        return (
          <div
            onClick={() => selectItem(_id, classType)}
            className={`${classType}-btn`}
            key={_id}
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
