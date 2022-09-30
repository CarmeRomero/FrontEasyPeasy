import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../context";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{ colorScheme: "light" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <UiProvider>
          <Component {...pageProps} />
        </UiProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
