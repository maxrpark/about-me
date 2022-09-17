import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import { GlobalProvider, UserThemeProvider } from "../context/";
import { GlobalStyle, lightTheme, darkTheme } from "../theme";
import { useUserThemeContext } from "../context/userThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { theme } = useUserThemeContext();
  return (
    <SessionProvider session={pageProps.session}>
      <UserThemeProvider>
        <GlobalProvider>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </GlobalProvider>
      </UserThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
