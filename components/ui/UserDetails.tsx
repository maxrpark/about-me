import Image from "next/image";
import { useRouter } from "next/router";
import { UserDetailsWrapper } from "../../styles/wrappers";
import { User } from "../../ts/interfaces/interfaces";

const UserDetails: React.FC<User> = ({ image, name }) => {
  const router = useRouter();
  const handleClick = () => {
    if (router.asPath != "/") return;
    router.push("/admin");
  };
  return (
    <UserDetailsWrapper>
      <figure className='user-image' onClick={handleClick}>
        <Image src={image} width={100} height={100} alt={"user-img"} />
      </figure>
      <p>{name}</p>
    </UserDetailsWrapper>
  );
};

export default UserDetails;
