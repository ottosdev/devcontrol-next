import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import prismaClient from "./prisma";
import { Adapter } from "next-auth/adapters";

interface UserProps {
  id: string;
  name: string;
  email: string;
}
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id } as UserProps;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
