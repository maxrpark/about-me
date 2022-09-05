import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { signOut } from "next-auth/react";
export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session }) {
            if (session?.user?.email) {
                const administrators = ["proyectoindit@gmail.com"];
                session.isAdmin = administrators.includes(session?.user?.email);
            }

            return session;
        },
    },
});
