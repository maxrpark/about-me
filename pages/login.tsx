import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";

const LoginPage: NextPage = () => {
    return (
        <div>
            <h2>Hello</h2>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const res = await getSession(ctx);
    if (res?.user) {
        return {
            redirect: {
                permanent: true,
                destination: "/admin",
            },
            props: {},
        };
    }
    return {
        props: {},
    };
};

export default LoginPage;
