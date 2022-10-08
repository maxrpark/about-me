import { LinkItemInt } from "../../ts/interfaces";
import { SingleLink } from "../";

interface Props {
  data: LinkItemInt[];
  type: string;
}

const MyLinks: React.FC<Props> = ({ data, type }) => {
  return (
    <div className={`${type}-container`}>
      {data.map((link: LinkItemInt) => {
        const { name, _id: id, url } = link;
        return (
          <a target={"_blank"} key={id} href={url} rel='noreferrer'>
            <SingleLink classType={type} name={name} />
          </a>
        );
      })}
    </div>
  );
};

export default MyLinks;
