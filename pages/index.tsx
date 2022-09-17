import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import fsPromises from "fs/promises";
import path from "path";
import styled from "styled-components";
import Image from "next/image";
import { icons, IconType } from "../components/icons";

import { ProfileDataInt } from "../ts/interfaces";

interface Props {
  data: ProfileDataInt;
}
interface ButtonsLink {
  name: string;
  url: string;
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
      <div className='btns-container'>
        {links.map((link: ButtonsLink, idx: number) => {
          return (
            <a
              className='btn'
              target={"_blank"}
              key={idx}
              href={link.url}
              rel='noreferrer'
            >
              {link.name}
            </a>
          );
        })}
      </div>
      <div className='social-icons'>
        {social.map((link: ButtonsLink, idx) => {
          const { name } = link;
          const SocialIcon = icons[name as IconType];
          return (
            <div key={idx}>
              <SocialIcon />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const filePath = path.join(process.cwd(), "db/db_about_me.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData: ProfileDataInt = JSON.parse(jsonData.toString());
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
