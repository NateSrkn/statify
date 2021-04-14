import { useState, useEffect } from "react";
import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "next-auth/client";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {isMounted && <Component {...pageProps} />}
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
