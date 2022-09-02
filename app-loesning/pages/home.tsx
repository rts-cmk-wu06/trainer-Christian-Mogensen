import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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

const Home: NextPage = ({ assets }: any) => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let rng = Math.floor(Math.random() * assets.length);
    setNumber(rng);
  }, []);

  const bigimg = assets[number].asset.url;

  return (
    <>
      <Head>
        <title>Svendeprøve - overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen min-h-screen p-5 mt-20 overflow-x-hidden">
        {/* <Navigation /> */}
        <div className="w-full">
          <div className="relative w-full overflow-hidden rounded-3xl homecard">
            {bigimg && (
              <Image
                priority={true}
                className="pointer-events-none"
                src={bigimg}
                alt="Picture of the author"
                width={320}
                height={320}
                layout="responsive"
                objectFit="cover"
              />
            )}
            <div className="absolute bottom-0 left-0 w-3/4 p-5 pb-10 roundedrightcorner bg-curry">
              <h1 className="text-2xl font-bold ">
                {assets[number]?.className}
              </h1>
              <StarRatingComp />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-medium">Classes for you</h2>
          <Carousel data={assets} />
        </div>
      </div>
    </>
  );
};

const StarRatingComp = () => {
  return (
    <div className="flex gap-4 mt-4">
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
      <AiFillStar />
    </div>
  );
};

export const Carousel = ({ data }: any) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -(175 * 2), right: 0 }}
      dragElastic={0.1}
      className="flex gap-4 min-w-[200%] mt-5"
    >
      {data.map((asset: any) => {
        return (
          <div
            key={asset.id}
            className="relative w-1/4 overflow-hidden rounded-3xl"
          >
            <Image
              src={asset.asset.url}
              width={150}
              height={180}
              loading="lazy"
              layout="responsive"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 roundedrightcorner bg-curry">
              <h3 className="truncate">{asset.className}</h3>
              <StarRatingComp />
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default Home;
