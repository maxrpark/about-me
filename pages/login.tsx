import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
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

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      <h2 className='title'>About me</h2>
      <form>
        <label htmlFor='name'>Name</label>
        <input onChange={handleFormChange} value={userForm.name} name='name' />
        <label htmlFor='Password'>Password</label>
        <input
          onChange={handleFormChange}
          value={userForm.password}
          name='password'
          type={"password"}
        />
        <button className='btn' type='submit' onClick={handleFormSubmit}>
          {isAlreadyRegister ? "login" : "register"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  place-content: center;
  grid-template-columns: 1fr;
  /* max-width: 300px; */
  .title {
    text-align: center;
    font-weight: 400;
    font-size: 66px;
  }

  .btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1.2rem;
    height: 50px;
    background: #e3f2fd;
    border: none;
    font-weight: 600;
    font-size: 29px;
    line-height: 35px;
  }
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getSession(ctx);

  await db.connect();
  const isAlreadyRegister =
    (await User.countDocuments({})) === 0 ? false : true;
  await db.disconnect();
  if (res?.user) {
    return {
      redirect: {
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
