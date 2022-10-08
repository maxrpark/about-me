import { useGlobalContext } from "../../../context/globalContext";
import { LinkItemInt } from "../../../ts/interfaces";
import { Pencil } from "../../icons";
import { SingleLink } from "../../";

interface Props {
  data: LinkItemInt[];
  type: string;
}

const EditLinks: React.FC<Props> = ({ data, type }) => {
  const { selectItem, selectOrCreateItem } = useGlobalContext();
  return (
    <div className={`${type}-container`}>
      {data.map((link: LinkItemInt) => {
        const { _id, name } = link;
        return (
          <div
            onClick={() => selectItem(_id, type)}
            className={`${type}-btn`}
            key={_id}
          >
            {type === "social" ? (
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
      <div className={`${type}-add`} onClick={() => selectOrCreateItem(type)}>
        {type === "social" ? "+" : "Add now button"}
      </div>
    </div>
  );
};

export default EditLinks;
