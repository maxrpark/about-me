import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import fsPromises from "fs/promises";
import path from "path";

import { useGlobalContext } from "../context/globalContext";
import { ProfileDataInt } from "../ts/interfaces";

import styled from "styled-components";

import { LinksModal, EditLinks } from "../components/";
import UserLayout from "../components/layouts/UserLayout";

interface Props {
  data: ProfileDataInt;
}

const ChangePage: NextPage<Props> = ({ data }) => {
  const { profileData, showModal, setData } = useGlobalContext();

  useEffect(() => {
    setData(data);
  }, []);
  if (!profileData.links) {
    return <h2>Loading</h2>;
  }
  return (
    <UserLayout>
      <Wrapper>
        <EditLinks data={profileData.links} classType={"links"} />
        <EditLinks data={profileData.social} classType={"social"} />
        {showModal && <LinksModal />}
      </Wrapper>
    </UserLayout>
  );
};

const Wrapper = styled.div`
  .links-container {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }

  .links-btn,
  .links-add {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
  }

  .social-container {
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem auto;
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session?.user?.isAdmin) {
    const filePath = path.join(process.cwd(), "db/db_about_me.json");
    const jsonData = await fsPromises.readFile(filePath);
    const objectData: ProfileDataInt = JSON.parse(jsonData.toString());

    return {
      props: {
        data: objectData,
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
