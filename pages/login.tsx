import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../db/connectDB";
import User from "../db/model/User";
import axios from "axios";
import { useRouter } from "next/router";
import { LoginWrapper } from "../styles/wrappers";

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
    <LoginWrapper>
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
    </LoginWrapper>
  );
};

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
