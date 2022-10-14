// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// export default NextAuth({
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       if (user.email === process.env.ADMINISTRATOR!) {
//         return true;
//       } else {
//         return false;
//       }
//     },
//     async session({ session }) {
//       if (session?.user?.email) {
//         const administrators = [process.env.ADMINISTRATOR];
//         session.user.isAdmin = administrators.includes(session?.user?.email);
//       }

//       return session;
//     },
//   },
// });

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../db/connectDB";
import User from "../../../db/model/User";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials as any;
        await db.connect();
        const user = await User.findOne({ email });
        await db.connect();
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
      credentials: {},
    }),
  ],
});
