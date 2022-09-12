import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useGlobalContext } from "../context/globalContext";
import fsPromises from "fs/promises";
import path from "path";
import styled from "styled-components";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
    data: any;
}

const ChangePage: NextPage<Props> = ({ data }) => {
    const { name, setData, deleteLink, profileData, saveChanges } =
        useGlobalContext();
    const { links } = data;

    useEffect(() => {
        setData(data);
        // const id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        // console.log(id);
    }, []);
    if (!profileData) {
        return <h2>Loading</h2>;
    }
    return (
        <Wrapper>
            <div className='btns-container'>
                {profileData?.links?.map((link: any) => {
                    return (
                        <div className='btn' key={link.id}>
                            {link.name}
                            <span onClick={() => deleteLink(link.id)}>
                                Deleted
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className='btn' onClick={() => saveChanges()}>
                Save
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
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
        justify-content: space-around;
        border: 2px solid;
    }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);
    if (session?.user?.isAdmin) {
        const filePath = path.join(process.cwd(), "db/db.json");
        const jsonData = await fsPromises.readFile(filePath);
        const objectData = JSON.parse(jsonData.toString());

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
