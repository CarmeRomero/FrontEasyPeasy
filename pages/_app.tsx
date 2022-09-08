import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiProvider } from "../context";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <UiProvider>
        <Component {...pageProps} />
      </UiProvider>
    </MantineProvider>
  );
}

export default MyApp;
