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
          <div key={link.id}>
            <SocialIcon />
          </div>
        );
      })}
    </div>
  );
};

export default MySocialLinks;
