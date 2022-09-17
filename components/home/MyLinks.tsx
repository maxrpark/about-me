import { LinkItemInt } from "../../ts/interfaces";
import { icons, IconType } from "../icons";

interface Props {
  data: LinkItemInt[];
  classType: string;
}

const MyLinks: React.FC<Props> = ({ data, classType }) => {
  return (
    <div className={`${classType}-container`}>
      {data.map((link: LinkItemInt) => {
        const { name } = link;

        let SocialIcon: any;
        if (classType === "social") {
          SocialIcon = icons[name as IconType];
        }
        return (
          <a
            className={`${classType}-btn`}
            target={"_blank"}
            key={link.id}
            href={link.url}
            rel='noreferrer'
          >
            {classType === "social" ? <SocialIcon /> : name}
          </a>
        );
      })}
    </div>
  );
};

export default MyLinks;
