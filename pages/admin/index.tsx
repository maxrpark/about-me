import { useEffect } from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Image from "next/image";

import { useGlobalContext, useUserThemeContext } from "../../context";
import { LinkItemInt, ThemeDataInt } from "../../ts/interfaces";
import {
  LinksModal,
  EditLinks,
  UserLayout,
  UserDetails,
} from "../../components";
import { LinkWrapper } from "../../styles/wrappers";

import UserLink from "../../db/model/Links";
import { db } from "../../db/connectDB";
import ThemeConfig from "../../db/model/Theme";
import axios from "axios";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: any;
  user: any;
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
        <UserDetails user={user} />
        <EditLinks type='links' data={profileData.links} />
        <EditLinks type='social' data={profileData.social} />
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let themesData: ThemeDataInt = { theme: "default", layout: "default" };

  let res = await axios(
    `https://api.github.com/users/${process.env.USER_NAME}`
  );

  await db.connect();
  const linksData = await UserLink.find({});
  let themeConfig: ThemeDataInt[] | null = await ThemeConfig.find({});
  if (themeConfig && themeConfig.length === 0) {
    await ThemeConfig.create(themesData);
  } else {
    themesData = JSON.parse(JSON.stringify(themeConfig[0]));
  }
  await db.disconnect();

  const links = linksData.filter((item: LinkItemInt) => item.type === "links");
  const social = linksData.filter(
    (item: LinkItemInt) => item.type === "social"
  );

  return {
    props: {
      links: JSON.parse(JSON.stringify(links)),
      social: JSON.parse(JSON.stringify(social)),
      themesData,
      user: res.data,
    },
  };
};

export default ChangePage;
