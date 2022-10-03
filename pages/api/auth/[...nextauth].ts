import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email === process.env.ADMINISTRATOR!) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session }) {
      if (session?.user?.email) {
        const administrators = [process.env.ADMINISTRATOR];
        session.user.isAdmin = administrators.includes(session?.user?.email);
      }

      return session;
    },
  },
});
