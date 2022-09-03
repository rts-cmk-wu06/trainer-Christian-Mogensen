import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/Nav/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <Navigation />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
