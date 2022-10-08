import { useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import { LinkWrapper } from "../styles/wrappers";
import { MyLinks, UserDetails } from "../components";
import { LinkItemInt, ThemeDataInt } from "../ts/interfaces";
import { useUserThemeContext } from "../context";
import { db } from "../db/connectDB";
import UserLink from "../db/model/Links";
import ThemeConfig from "../db/model/Theme";
import axios from "axios";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: ThemeDataInt;
  user: any;
}

const Home: NextPage<Props> = ({ links, social, themesData, user }) => {
  const { setThemeData } = useUserThemeContext();

  useEffect(() => {
    setThemeData(themesData);
  }, []);

  return (
    <main>
      <LinkWrapper className='layout'>
        <UserDetails user={user} />
        <MyLinks type='links' data={links} />
        <MyLinks type='social' data={social} />
      </LinkWrapper>
    </main>
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

export default Home;
