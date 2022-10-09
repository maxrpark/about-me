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
// import getData from "../../db/getData";

import axios from "axios";

import { db } from "../../db/connectDB";
import UserLink from "../../db/model/Links";
import ThemeConfig from "../../db/model/Theme";

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
    // if (!profileData.links) {
    setData(linksData);
    setThemeData(themesData);
    // }
  }, []);
  if (!profileData?.links) {
    return <h2>Loading!</h2>;
  }
  return (
    <UserLayout>
      <LinkWrapper className='layout'>
        <UserDetails {...user} />
        <section className='links-content'>
          <EditLinks type='links' data={profileData.links} />
          <EditLinks type='social' data={profileData.social} />
        </section>
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // let { user, links, social, themesData } = await getData();

  let themesData: ThemeDataInt = { theme: "default", layout: "default" };

  let { data } = await axios<User>(
    `https://api.github.com/users/${process.env.USER_NAME}`
  );
  let user: User = {
    name: data.name,
    image: data.avatar_url as string, // TODO
    isAdmin: true,
    email: data.email,
  };

  await db.connect();
  const linksData = await UserLink.find({});
  let themeConfig: ThemeDataInt[] | null = await ThemeConfig.find({});
  if (themeConfig && themeConfig.length === 0) {
    await ThemeConfig.create(themesData);
  } else {
    themesData = JSON.parse(JSON.stringify(themeConfig[0]));
  }

  await db.disconnect();

  let links = linksData.filter((item: LinkItemInt) => item.type === "links");
  let social = linksData.filter((item: LinkItemInt) => item.type === "social");

  links = JSON.parse(JSON.stringify(links));
  social = JSON.parse(JSON.stringify(social));

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
