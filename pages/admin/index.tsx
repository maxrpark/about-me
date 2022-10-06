import { useEffect } from "react";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import Image from "next/image";

import { useGlobalContext, useUserThemeContext } from "../../context";
import { LinkItemInt, ThemeDataInt } from "../../ts/interfaces";
import { LinksModal, EditLinks, UserLayout } from "../../components";
import { LinkWrapper } from "../../styles/wrappers";

import UserLink from "../../db/model/Links";
import { db } from "../../db/connectDB";
import ThemeConfig from "../../db/model/Theme";

interface Props {
  links: LinkItemInt[];
  social: LinkItemInt[];
  themesData: any;
}

const ChangePage: NextPage<Props> = ({ links, social, themesData }) => {
  const { profileData, showModal, setData } = useGlobalContext();
  const { setThemeData } = useUserThemeContext();

  let linksData = { links, social };

  useEffect(() => {
    setData(linksData);
    setThemeData(themesData);
  }, []);
  if (!profileData?.links) {
    return <h2>Loading!</h2>;
  }
  return (
    <UserLayout>
      <LinkWrapper className='layout'>
        <figure className='user-image'>
          <Image
            src={"https://avatars.githubusercontent.com/u/84664090?v=4"}
            width={100}
            height={100}
            alt={"user-img"}
          />
        </figure>
        <EditLinks data={profileData.links} />
        <EditLinks data={profileData.social} />
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

// TODO change to getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  let data = { theme: "default", layout: "default" };

  await db.connect();
  const linksData = await UserLink.find({});
  const themeConfig = await ThemeConfig.find({});
  await db.disconnect();

  const links = linksData.filter((item: LinkItemInt) => item.type === "links");
  const social = linksData.filter(
    (item: LinkItemInt) => item.type === "social"
  );

  return {
    props: {
      links: JSON.parse(JSON.stringify(links)),
      social: JSON.parse(JSON.stringify(social)),
      themesData: themeConfig[0] ? themeConfig[0] : data,
    },
    revalidate: 10, // In seconds
  };
};

export default ChangePage;
