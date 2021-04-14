import { useEffect, useState, useContext, createContext } from "react";
import {
  checkForExpiration,
  getAccessToken,
  getQueries,
  getRefreshToken,
  storage,
} from "../utils/helpers";
import { useRouter } from "next/router";

export const TokenContext = createContext(null);

export const useTokenContext = () => {
  const token = useContext(TokenContext);
  return token;
};

export const useToken = () => {
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const localToken = storage.get("token");
    const isExpired = localToken
      ? checkForExpiration(localToken.expires_in)
      : null;

    const { code } = getQueries();
    const retrieveToken = async (key, isRefresh) => {
      let token = null;
      if (isRefresh) {
        token = await getRefreshToken(key);
      } else {
        token = await getAccessToken(key);
      }

      if (token) {
        setToken(token);
        storage.add("token", token.access_token, token.expires_in);
        storage.add("refresh", token.refresh_token);
        router.push("/");
      }
    };
    if (localToken) {
      if (isExpired) {
        const refresh_token = storage.get("refresh");
        retrieveToken(refresh_token.value);
      }
      setToken(localToken.value);
    }
    if (!localToken && code) {
      retrieveToken(code);
    }
    if (!localToken && !code) {
      router.push("/auth");
    }
  }, []);

  return token;
};
