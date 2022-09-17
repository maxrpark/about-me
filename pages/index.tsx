import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import fsPromises from "fs/promises";
import path from "path";
import styled from "styled-components";
import Image from "next/image";
import { MyLinksButtons, MySocialLinks } from "../components";
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
      <MyLinksButtons data={links} />
      <MySocialLinks data={social} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filePath = path.join(process.cwd(), "db/db_about_me.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData: LinkItemInt = JSON.parse(jsonData.toString());
  return {
    props: {
      data: objectData,
    },
  };
};

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  color: red;

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

  .btns-container {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }

  .btn {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
  }

  .social-icons {
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }
`;

export default Home;
