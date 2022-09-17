import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SessionProvider } from "next-auth/react";

import { GlobalProvider } from "../context/globalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    </SessionProvider>
  );
}

export default MyApp;

// export default function App({
//     Component,
//     pageProps: { session, ...pageProps },
// }) {
//     return (
//         <SessionProvider session={session}>
//             <Component {...pageProps} />
//         </SessionProvider>
//     );
// }
