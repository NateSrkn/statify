// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Providers from "next-auth/providers";
import NextAuth from "next-auth";
import { storage, getRefreshToken } from "../../../utils/helpers";

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      scope: [
        "user-top-read",
        "user-read-recently-played",
        "user-read-currently-playing",
        "user-read-playback-state",
      ].join(","),
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await getRefreshToken(token);
    },
    async session(session, token) {
      if (token) {
        session.user = token.user;
        session.expires = new Date(token.accessTokenExpires);
        session.accessToken = token.accessToken;
        session.error = token.error;
      }

      return session;
    },
  },
});
