import Image from "next/image";
import { useRouter } from "next/router";
import { UserDetailsWrapper } from "../../styles/wrappers";

interface Props {
  user: any;
}

const UserDetails: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const handleClick = () => {
    if (router.asPath != "/") return;
    router.push("/admin");
  };
  return (
    <UserDetailsWrapper>
      <figure className='user-image' onClick={handleClick}>
        <Image
          src={user.avatar_url}
          width={100}
          height={100}
          alt={"user-img"}
        />
      </figure>
      <p>{user.name}</p>
    </UserDetailsWrapper>
  );
};

export default UserDetails;
