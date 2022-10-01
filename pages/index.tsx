import type { NextPage } from "next";
import { GetServerSideProps, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

import getData from "../utils/getData";

import styled from "styled-components";
import { LinkWrapper } from "../styles/wrappers";
import { MyLinks } from "../components";
import { ProfileDataInt, LinkItemInt, ThemeDataInt } from "../ts/interfaces";
import { useUserThemeContext } from "../context";
import { useEffect } from "react";

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
    <Wrapper>
      <figure className='user-image'>
        <Link href={"/admin"}>
          <Image
            src={"https://avatars.githubusercontent.com/u/84664090?v=4"}
            width={100}
            height={100}
            alt={"user-img"}
          />
        </Link>
      </figure>
      <LinkWrapper className='layout'>
        <MyLinks data={links} classType={"links"} />
        <MyLinks data={social} classType={"social"} />
      </LinkWrapper>
    </Wrapper>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const themesData: ThemeDataInt = await getData("db/db_themes_options.json");

//   return {
//     props: {
//       themesData,
//     },
//   };
// };

const Wrapper = styled.section`
  .user-image {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
  }
`;

export default Home;
