import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
const rngAtom = atom(0);

const Home: NextPage = ({ assets, rating, session }: any) => {
  const bigimg = session?.asset?.url;
  const newurl = bigimg?.replace(
    "http://localhost:4000",
    `${process.env.NEXT_PUBLIC_URL}`
  );

  let sum = rating
    .map((item: any) => item.rating)
    .reduce((prev: any, curr: any) => prev + curr, 0);
  let avg = sum / rating.length;
  let noDecimalAvg = Math.ceil(avg);

  const correctRating = noDecimalAvg;

  return (
    <>
      <div className="w-screen min-h-screen p-5 overflow-x-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ y: -150, scale: 1.4, height: "150%" }}
            animate={{ scale: 1, y: 0, height: "100%" }}
            exit={{ scale: 1.4, y: -150, height: "150%" }}
            transition={{ duration: 0.5 }}
            className="w-full mt-20"
          >
            {newurl ? (
              <Link href={`/classes/${session?.id}`}>
                <div className="relative w-full overflow-hidden rounded-3xl homecard">
                  {newurl && (
                    <Image
                      priority={true}
                      className="pointer-events-none"
                      src={newurl}
                      alt="Picture of the author"
                      width={320}
                      height={320}
                      layout="responsive"
                      objectFit="cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 w-3/4 p-5 pb-10 roundedrightcorner bg-curry">
                    <h1 className="text-2xl font-bold ">
                      {session?.className}
                    </h1>

                    <StarRatingComp fp={true} ratingVal={correctRating} />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex items-center rounded-3xl justify-center w-full h-[320px] text-white bg-ashe-dark">
                {"No data found. Try reload page"}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-5">
          <h2 className="font-bold text-medium">Classes for you</h2>
          <Carousel data={assets} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes`;
  const res = await fetch(url);
  const assets = await res.json();
  const rng = Math.floor(Math.random() * assets.length);

  const sessionUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${rng}`;
  const sessionRes = await fetch(sessionUrl);
  const sessionData = await sessionRes.json();

  const ratingUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${rng}/ratings`;
  const ratingRes = await fetch(ratingUrl);
  const ratingData = await ratingRes.json();

  return {
    props: {
      assets: assets,
      rating: ratingData,
      session: sessionData,
    },
  };
}

export const StarRatingComp = ({ ratingVal, fp }: any) => {
  return (
    <div className="flex gap-4">
      <AiFillStar
        className={
          ratingVal >= 1 && fp
            ? "text-black"
            : ratingVal >= 1
            ? "text-curry"
            : "text-ashe-dark"
        }
      />
      <AiFillStar
        className={
          ratingVal >= 2 && fp
            ? "text-black"
            : ratingVal >= 2
            ? "text-curry"
            : "text-ashe-dark"
        }
      />
      <AiFillStar
        className={
          ratingVal >= 3 && fp
            ? "text-black"
            : ratingVal >= 3
            ? "text-curry"
            : "text-ashe-dark"
        }
      />
      <AiFillStar
        className={
          ratingVal >= 4 && fp
            ? "text-black"
            : ratingVal >= 4
            ? "text-curry"
            : "text-ashe-dark"
        }
      />
      <AiFillStar
        className={
          ratingVal === 5 && fp
            ? "text-black"
            : ratingVal === 5
            ? "text-curry"
            : "text-ashe-dark"
        }
      />
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
      {data.map((asset: any, index: any) => {
        const [ratingNum, setRatingNumb] = useState([]);
        useEffect(() => {
          const ratingUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${asset?.id}/ratings`;
          fetch(ratingUrl)
            .then((res) => res.json())
            .then((data) => setRatingNumb(data));
        }, []);
        let sum = ratingNum
          .map((item: any) => item.rating)
          .reduce((prev: any, curr: any) => prev + curr, 0);
        let avg = sum / ratingNum.length;
        let noDecimalAvg = Math.ceil(avg);

        const ratingnumber = noDecimalAvg;
        const newurl = asset.asset.url.replace(
          "http://localhost:4000",
          `${process.env.NEXT_PUBLIC_URL}`
        );

        return (
          <Link href={`/classes/${asset.id}`} key={asset.id}>
            <div className="relative w-1/4 overflow-hidden rounded-3xl">
              <Image
                src={newurl}
                width={150}
                height={180}
                priority={true}
                layout="responsive"
                objectFit="cover"
              />

              <div className="absolute bottom-0 left-0 w-full p-5 roundedrightcorner bg-curry">
                <h3 className="truncate">{asset.className}</h3>
                <div>
                  <StarRatingComp fp={true} ratingVal={ratingnumber} />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default Home;
