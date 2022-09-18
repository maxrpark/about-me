import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";

import getData from "../utils/getData";

import styled from "styled-components";
import { LinkWrapper } from "../styles/wrappers";
import { MyLinks } from "../components";
import { ProfileDataInt, LinkItemInt } from "../ts/interfaces";

interface Props {
  data: ProfileDataInt;
}

const Home: NextPage<Props> = ({ data }) => {
  const { links, social } = data;

  return (
    <Wrapper>
      <figure className='user-image'>
        <Image
          src={"https://avatars.githubusercontent.com/u/84664090?v=4"}
          width={100}
          height={100}
          alt={"user-img"}
        />
      </figure>
      <LinkWrapper className='layout'>
        <MyLinks data={links} classType={"links"} />
        <MyLinks data={social} classType={"social"} />
      </LinkWrapper>
      <Link href={"/admin"}>admin</Link>
      <Link href={"/login"}>login</Link>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const objectData: LinkItemInt = await getData("db/db_about_me.json");

  return {
    props: {
      data: objectData,
    },
  };
};

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
