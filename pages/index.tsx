import { useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import { LinkWrapper } from "../styles/wrappers";
import { MyLinks } from "../components";
import { LinkItemInt, ThemeDataInt } from "../ts/interfaces";
import { useUserThemeContext } from "../context";
import { db } from "../db/connectDB";
import UserLink from "../db/model/Links";
import ThemeConfig from "../db/model/Theme";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: ThemeDataInt;
}

const Home: NextPage<Props> = ({ links, social, themesData }) => {
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
        <MyLinks type='links' data={links} />
        <MyLinks type='social' data={social} />
      </LinkWrapper>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let themesData: ThemeDataInt = { theme: "default", layout: "default" };

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
    },
  };
};

export default Home;
