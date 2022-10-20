import { useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import { LinkWrapper } from "../styles/wrappers";
import { MyLinks, UserDetails } from "../components";
import { LinkItemInt, ThemeDataInt, User } from "../ts/interfaces";
import { useUserThemeContext } from "../context";
import getData from "../db/getData";

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
        <section className={`links-content ${themesData.layout}`}>
          <MyLinks type='links' data={links} />
          <MyLinks type='social' data={social} />
        </section>
      </LinkWrapper>
    </main>
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

export default Home;
