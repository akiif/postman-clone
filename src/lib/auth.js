import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/helpers/auth.helper";

const providers = [
  CredentialsProvider({
    name: "Credentials",

    credentials: {
      username: {
        label: "Username",
        type: "text",
        placeholder: "j smith",
      },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      if (!credentials?.username || !credentials?.password) return null;

      const { error, user } = await login(
        credentials?.username,
        credentials?.password
      );
      if (error) {
        throw new Error(JSON.stringify(error));
      }
      return user;
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }) => {
    return { ...token, ...user };
  },
  session: async ({ session, user, token }) => {
    return token;
  },
};

export const authOptions = {
  secret: process.env.JWT_SECRET,
  providers,
  callbacks,
  pages: {
    signIn: "/login",
  },
};

const handlers = NextAuth(authOptions);

export default handlers;
