import { db } from "@/app/_lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
    providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
   session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 3600 segundos = 1 hora
  },
  callbacks: {
  jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
        if ("user" in user) {
          token.user = user.user;
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id);
      session.user.user = String(token.user ?? "");
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
};