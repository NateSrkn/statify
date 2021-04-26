import { useState, useEffect } from "react";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
import { MouseTracker } from "../components/MouseTracker";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <MouseTracker>{isMounted && <Component {...pageProps} />}</MouseTracker>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
