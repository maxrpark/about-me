import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { GlobalProvider, UserThemeProvider } from "../context/";
import { GlobalStyle, lightTheme, darkTheme } from "../theme";
import { useUserThemeContext } from "../context/userThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserThemeProvider>
        <GlobalProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </GlobalProvider>
      </UserThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
