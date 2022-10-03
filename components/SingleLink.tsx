import { icons, IconType } from "./icons";

interface Props {
  classType?: string;
  name: string;
}

const SingleLink: React.FC<Props> = ({ classType, name }) => {
  let SocialIcon: any;
  if (classType === "social") {
    SocialIcon = icons[name as IconType];
  }
  return (
    <div className={`${classType}-btn`}>
      {classType === "social" && name ? <SocialIcon /> : name}
    </div>
  );
};

export default SingleLink;
