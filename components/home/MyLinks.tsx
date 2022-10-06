import { LinkItemInt } from "../../ts/interfaces";
import { SingleLink } from "../";

interface Props {
  data: LinkItemInt[];
}

const MyLinks: React.FC<Props> = ({ data }) => {
  let classType = data[0].type!;
  return (
    <div className={`${classType}-container`}>
      {data.map((link: LinkItemInt) => {
        const { name, _id: id, url } = link;
        return (
          <a target={"_blank"} key={id} href={url} rel='noreferrer'>
            <SingleLink classType={classType} name={name} />
          </a>
        );
      })}
    </div>
  );
};

export default MyLinks;
