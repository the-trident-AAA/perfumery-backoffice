import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth";

interface CredentialsType {
  username: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as CredentialsType;
        const res = await login({ username, password });

        if (!res.response || res.error) {
          return null;
        }
        const user = res.response;
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
});
