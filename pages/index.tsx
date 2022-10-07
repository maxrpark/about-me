import { useEffect } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
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
  themesData: any;
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
        <MyLinks data={links} />
        <MyLinks data={social} />
      </LinkWrapper>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let data = { theme: "default", layout: "default" };
  let themesData = {};

  await db.connect();
  const linksData = await UserLink.find({});
  let themeConfig = await ThemeConfig.find({});
  if (themeConfig.length === 0) {
    await ThemeConfig.create(data);
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
    revalidate: 10, // In seconds
  };
};

export default Home;
