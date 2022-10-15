import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "../../../db/connectDB";
import User from "../../../db/model/User";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        name: { type: "text" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        const { name, password } = credentials as any;

        await db.connect();
        const user = await User.findOne({ name });

        await db.connect();
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid credentials");
        }

        return { name: user.name, image: user.image, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log("token", token);
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
