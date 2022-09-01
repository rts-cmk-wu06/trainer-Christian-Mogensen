import { motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const url = "http://localhost:4000/api/v1/classes";
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(url);
  const assets = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
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
      <div className="w-screen min-h-screen p-5 overflow-x-hidden">
        <header className="sticky top-0 z-50 pb-5">
          <nav className="flex items-center justify-between mt-2 list-none text-large">
            <li className="">Popular classes</li>
            <li>
              <button className="text-5xl">
                <HiMenuAlt3 />
              </button>
            </li>
          </nav>
        </header>
        <div className="w-full">
          <div className="relative w-full overflow-hidden rounded-3xl homecard">
            {bigimg && (
              <Image
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
          <motion.div
            drag="x"
            dragConstraints={{ left: -(175 * 2), right: 0 }}
            dragElastic={0.1}
            className="flex gap-4 min-w-[200%] mt-5"
          >
            {assets.map((asset: any) => (
              <div
                key={asset.id}
                className="relative w-1/4 overflow-hidden rounded-3xl"
              >
                <Image
                  src={asset.asset.url}
                  width={180}
                  height={180}
                  layout="responsive"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 roundedrightcorner bg-curry">
                  <h3 className="truncate">{asset.className}</h3>
                  <StarRatingComp />
                </div>
              </div>
            ))}
          </motion.div>
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

export default Home;
