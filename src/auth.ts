import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth";

interface CredentialsType {
  email: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as CredentialsType;
        const res = await login({ firstCredential: email, password });

        if (!res.response || res.error) {
          return {
            id: "1",
            name: "test",
            email: "test@gmail.com",
            accessToken: "token",
          };
        }
        const user = res.response;
        return {
          id: user.id,
          name: user.name,
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
