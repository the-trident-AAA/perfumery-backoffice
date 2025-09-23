import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth";

interface CredentialsType {
  username: string;
  password: string;
}

const isProduction = process.env.AUTH_MODE === "prod";
const useSecureCookies = isProduction;
const cookiePrefix = useSecureCookies ? "__Secure-" : "";

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
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  trustHost: !isProduction,

  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token-panel`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: process.env.NEXTAUTH_COOKIE_DOMAIN || undefined,
      },
    },
  },
});
