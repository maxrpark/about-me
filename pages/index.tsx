import { useEffect } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import getData from "../utils/getData";

import { LinkWrapper } from "../styles/wrappers";
import { MyLinks } from "../components";
import { ProfileDataInt, LinkItemInt, ThemeDataInt } from "../ts/interfaces";
import { useUserThemeContext } from "../context";

interface Props {
  linksData: ProfileDataInt;
  themesData: any;
}

const Home: NextPage<Props> = ({ linksData, themesData }) => {
  const { links, social } = linksData;
  const { setThemeData } = useUserThemeContext();

  useEffect(() => {
    setThemeData(themesData);
  }, []);

  return (
    <main>
      <LinkWrapper className='layout'>
        <figure className='user-image'>
          <Link href={"/admin"}>
            <a>
              <Image
                src={"https://avatars.githubusercontent.com/u/84664090?v=4"}
                width={100}
                height={100}
                alt={"user-img"}
              />
            </a>
          </Link>
        </figure>
        <MyLinks data={links} classType={"links"} />
        <MyLinks data={social} classType={"social"} />
      </LinkWrapper>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const linksData: LinkItemInt = await getData("db/db_about_me.json");
  const themesData: ThemeDataInt = await getData("db/db_themes_options.json");

  return {
    props: {
      linksData,
      themesData,
    },
    revalidate: 10, // In seconds
  };
};

export default Home;
