import type { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";

interface User {
    name: string;
    email: string;
    isAdmin: boolean;
    image: string;
}

interface Props {
    user: User;
}

const AdminPage: NextPage<Props> = ({ user }) => {
    return (
        <div>
            Hello
            <h2>{user.email}</h2>
            <h2>{user.name}</h2>
            Signed in as {user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (session?.isAdmin) {
        return {
            props: {
                user: session.user,
            },
        };
    } else if (!session?.isAdmin) {
        return {
            redirect: {
                permanent: false,
                destination: "/create-project",
            },
            props: {},
        };
    }
    return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props: {},
    };
};

export default AdminPage;
