import { useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import { LinkWrapper } from "../styles/wrappers";
import { MyLinks, UserDetails } from "../components";
import { LinkItemInt, ThemeDataInt, User } from "../ts/interfaces";
import { useUserThemeContext } from "../context";
// import getData from "../db/getData";

import axios from "axios";
// import { LinkItemInt, ThemeDataInt, User } from "../ts/interfaces";
import { db } from "../db/connectDB";
import UserLink from "../db/model/Links";
import ThemeConfig from "../db/model/Theme";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: ThemeDataInt;
  user: User;
}

const Home: NextPage<Props> = ({ links, social, themesData, user }) => {
  const { setThemeData } = useUserThemeContext();

  useEffect(() => {
    setThemeData(themesData);
  }, []);

  return (
    <main>
      <LinkWrapper className='layout'>
        <UserDetails {...user} />
        <section className='links-content'>
          <MyLinks type='links' data={links} />
          <MyLinks type='social' data={social} />
        </section>
      </LinkWrapper>
    </main>
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

export default Home;
