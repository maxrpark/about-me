import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { db } from "../db/connectDB";
import User from "../db/model/User";
import axios from "axios";

const useDetails = {
  name: "",
  password: "",
};
interface Props {
  isAlreadyRegister: boolean;
}

const LoginPage: NextPage<Props> = ({ isAlreadyRegister }) => {
  const [userForm, setUserForm] = useState(useDetails);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserForm((oldValue) => {
      let updated = { ...oldValue, [name]: value };
      return updated;
    });
  };

  const handleFormClick = async () => {
    const res = await axios.post(`/api/auth/register`, userForm);
    console.log(res.data);
  };
  return (
    <div>
      <h2>Hello</h2>

      {isAlreadyRegister ? "Register" : "login"}
      <form>
        <input onChange={handleFormChange} value={userForm.name} name='name' />
        <input
          onChange={handleFormChange}
          value={userForm.password}
          name='password'
        />
      </form>
      <button onClick={handleFormClick}>Sign in</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getSession(ctx);

  await db.connect();
  const isAlreadyRegister =
    (await User.countDocuments({})) === 0 ? true : false;
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
