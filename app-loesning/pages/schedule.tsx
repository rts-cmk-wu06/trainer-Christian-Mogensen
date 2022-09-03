import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

export async function getStaticProps() {
  const url = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/classes`;
  const res = await fetch(url);
  const assets = await res.json();
  return {
    props: {
      assets,
    },
  };
}

const Schedule: NextPage = ({ assets }: any) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);
  return (
    <>
      <Head>
        <title>Svendeprøve - overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen min-h-screen p-5 mt-20 overflow-x-hidden"></div>
    </>
  );
};

export default Schedule;
