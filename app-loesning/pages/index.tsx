import type { NextPage } from "next";
import Head from "next/head";
import Welcome from "./welcome";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Svendeprøve</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome />
    </>
  );
};

export default Home;
