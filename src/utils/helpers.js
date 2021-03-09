import axios from "axios";
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export const getRefreshToken = async (token) => {
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
        redirect_uri,
      }),
    });
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const api = async ({ url, method = "get", params, headers = {} }) => {
  try {
    return await axios({
      baseURL: "https://api.spotify.com/v1/",
      url,
      method,
      headers,
      params,
    });
  } catch (error) {
    throw new Error(error);
  }
};
