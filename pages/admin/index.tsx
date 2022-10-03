import { useEffect } from "react";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import Image from "next/image";

import { useGlobalContext, useUserThemeContext } from "../../context";
import { ProfileDataInt, ThemeDataInt } from "../../ts/interfaces";
import { LinksModal, EditLinks, UserLayout } from "../../components";
import { LinkWrapper } from "../../styles/wrappers";
import getData from "../../utils/getData";

interface Props {
  linksData: ProfileDataInt;
  themesData: any;
}

const ChangePage: NextPage<Props> = ({ linksData, themesData }) => {
  const { profileData, showModal, setData } = useGlobalContext();
  const { setThemeData } = useUserThemeContext();

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
        <EditLinks data={profileData.links} classType={"links"} />
        <EditLinks data={profileData.social} classType={"social"} />
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const linksData: ProfileDataInt = await getData("db/db_about_me.json");
  const themesData: ThemeDataInt = await getData("db/db_themes_options.json");

  return {
    props: {
      linksData,
      themesData,
    },
  };
};

export default ChangePage;
