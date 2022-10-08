import { useEffect } from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";

import { useGlobalContext, useUserThemeContext } from "../../context";
import { LinkItemInt, ThemeDataInt, User } from "../../ts/interfaces";
import {
  LinksModal,
  EditLinks,
  UserLayout,
  UserDetails,
} from "../../components";
import { LinkWrapper } from "../../styles/wrappers";
import getData from "../../db/getData";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: ThemeDataInt;
  user: User;
}

const ChangePage: NextPage<Props> = ({ links, social, themesData, user }) => {
  const { profileData, showModal, setData } = useGlobalContext();
  const { setThemeData } = useUserThemeContext();

  let linksData = { links, social };

  useEffect(() => {
    if (!profileData.links) {
      setData(linksData);
      setThemeData(themesData);
    }
  }, []);
  if (!profileData?.links) {
    return <h2>Loading!</h2>;
  }
  return (
    <UserLayout>
      <LinkWrapper className='layout'>
        <UserDetails {...user} />
        <EditLinks type='links' data={profileData.links} />
        <EditLinks type='social' data={profileData.social} />
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let { user, links, social, themesData } = await getData();

  return {
    props: {
      links,
      social,
      themesData,
      user,
    },
  };
};

export default ChangePage;
