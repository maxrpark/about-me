import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

import { useGlobalContext, useUserThemeContext } from "../context/";
import { ProfileDataInt } from "../ts/interfaces";

import { LinksModal, EditLinks } from "../components/";
import UserLayout from "../components/layouts/UserLayout";
import { LinkWrapper } from "../styles/wrappers";

import getData from "../utils/getData";

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
  if (!profileData.links) {
    return <h2>Loading!</h2>;
  }
  return (
    <UserLayout>
      <LinkWrapper className='layout'>
        <EditLinks data={profileData.links} classType={"links"} />
        <EditLinks data={profileData.social} classType={"social"} />
        {showModal && <LinksModal />}
      </LinkWrapper>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session?.user?.isAdmin) {
    const linksData: ProfileDataInt = await getData("db/db_about_me.json");
    const themesData: any = await getData("db/db_themes_options.json");

    return {
      props: {
        linksData,
        themesData,
      },
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/admin",
    },
    props: {},
  };
};

export default ChangePage;
