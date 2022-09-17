import type { NextPage } from "next";
import { getSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { User } from "../ts/interfaces/interfaces";
import Link from "next/link";
import UserLayout from "../components/layouts/UserLayout";

interface Props {
  user: User;
}

const AdminPage: NextPage<Props> = ({ user }) => {
  return (
    <UserLayout>
      <>
        Hello
        <h2>{user.email}</h2>
        <h2>{user.name}</h2>
        Signed in as {user.email} <br />
        <button>
          <Link href='/change'>Edit Links</Link>
        </button>
        <button onClick={() => signOut()}>Sign out</button>
        <button>Change theme</button>
      </>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session?.user?.isAdmin) {
    return {
      props: {
        user: session.user,
      },
    };
  } else if (session && !session?.user?.isAdmin) {
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
