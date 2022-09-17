import { LinkItemInt } from "../../ts/interfaces";
import { icons, IconType } from "../icons";
interface Props {
  data: LinkItemInt[];
}

const MySocialLinks: React.FC<Props> = ({ data }) => {
  return (
    <div className='social-icons'>
      {data.map((link) => {
        const { name } = link;
        const SocialIcon = icons[name as IconType];
        return (
          <a
            className='btn'
            target={"_blank"}
            key={link.id}
            href={link.url}
            rel='noreferrer'
          >
            <SocialIcon />
          </a>
        );
      })}
    </div>
  );
};

export default MySocialLinks;
