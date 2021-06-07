import { useState, useEffect } from "react";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as AuthProvider } from "next-auth/client";
import { MouseTracker } from "../components/MouseTracker";
import { Provider as StoreProvider } from "jotai";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <AuthProvider session={pageProps.session}>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <MouseTracker>
            {isMounted && <Component {...pageProps} />}
          </MouseTracker>
        </QueryClientProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default MyApp;
