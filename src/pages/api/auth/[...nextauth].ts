import NextAuth, { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1000 * 60 * 60 * 1,
    /**
     * sessions should only last 1 hour
     * because spotify invalidates
     * access tokens after 1 hour
     */
    updateAge: 0,
  },
  providers: [
    SpotifyProvider({
      /* @ts-ignore */
      clientId: process.env.SPOTIFY_ID,
      /* @ts-ignore */
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: {
        params: { scope: "user-top-read user-read-recently-played " },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
