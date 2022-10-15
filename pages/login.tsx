import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { db } from "../db/connectDB";
import User from "../db/model/User";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

const useDetails = {
  name: "",
  password: "",
};
interface Props {
  isAlreadyRegister: boolean;
}

const LoginPage: NextPage<Props> = ({ isAlreadyRegister }) => {
  const [userForm, setUserForm] = useState(useDetails);
  const router = useRouter();
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserForm((oldValue) => {
      let updated = { ...oldValue, [name]: value };
      return updated;
    });
  };

  const handleFormClick = async () => {
    if (!isAlreadyRegister) {
      try {
        const res = await axios.post(`/api/auth/register`, userForm);
        await signIn("credentials", {
          redirect: false,
          ...userForm,
        });
        if (res.status === 200) {
          router.push("/admin");
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          ...userForm,
        });

        if (res?.status === 200) {
          router.push("/admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Wrapper>
      <h2>Hello</h2>

      {isAlreadyRegister ? "login" : "register"}
      <form>
        <input onChange={handleFormChange} value={userForm.name} name='name' />
        <input
          onChange={handleFormChange}
          value={userForm.password}
          name='password'
        />
      </form>
      <button onClick={handleFormClick}>Sign in</button>
    </Wrapper>
  );
};

const Wrapper = styled.main``;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getSession(ctx);

  await db.connect();
  const isAlreadyRegister =
    (await User.countDocuments({})) === 0 ? false : true;
  await db.disconnect();
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
    props: {
      isAlreadyRegister,
    },
  };
};

export default LoginPage;
