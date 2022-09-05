import NextAuth from "next-auth";
import { User } from "../ts/interfaces";

declare module "next-auth" {
    interface Session extends User {
        user: User;
    }
}
