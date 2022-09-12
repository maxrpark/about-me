import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useGlobalContext } from "../context/globalContext";
import fsPromises from "fs/promises";
import path from "path";
import styled from "styled-components";
import { ChangeEvent, useEffect } from "react";

import { FormRow } from "../components/";

interface Props {
    data: any;
}

const ChangePage: NextPage<Props> = ({ data }) => {
    const {
        isEditing,
        profileData,
        selectedLink,
        showModal,
        setData,
        deleteItem,
        selectItem,
        saveChanges,
        handleInputChange,
        handleFormSubmit,
        addNewItem,
    } = useGlobalContext();
    const { links } = data;

    useEffect(() => {
        setData(data);
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
                            <span onClick={() => deleteItem(link.id)}>
                                Deleted
                            </span>
                            <span onClick={() => selectItem(link.id)}>
                                Edit
                            </span>
                        </div>
                    );
                })}
            </div>
            {showModal && (
                <div className='modal'>
                    <form>
                        <FormRow
                            name='name'
                            type='text'
                            formName='selectedLink'
                            value={selectedLink.name}
                            handleChange={handleInputChange}
                        />
                        <FormRow
                            name='url'
                            type='text'
                            formName='selectedLink'
                            value={selectedLink.url}
                            handleChange={handleInputChange}
                        />

                        <button
                            type='submit'
                            className='btn'
                            onClick={handleFormSubmit}
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            )}

            <div className='btn' onClick={() => saveChanges()}>
                Save
            </div>
            <div className='btn' onClick={addNewItem}>
                Add Link
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
