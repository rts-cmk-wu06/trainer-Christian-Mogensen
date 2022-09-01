import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import coverimg1 from "../public/Assets/welcome-background.jpg";
import coverimg2 from "../public/Assets/welcome-center.jpg";
const Welcome: NextPage = () => {
  return (
    <>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative inset-0">
        <header className="absolute z-10 top-1/4 left-10">
          <h1 className="font-bold leading-[3.5rem] capitalize text-largest block text-curry">
            <span className="block"> believe</span> yourself
          </h1>
          <h2 className="relative mt-4 font-bold text-white text-large whitebar">
            Train like a pro
          </h2>
        </header>
        <div className="relative w-screen h-screen">
          <div className="h-1/2 -z-10">
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
              src={coverimg1}
              alt="cover"
            />
          </div>
          <div className="absolute bottom-0 w-screen h-[50vh]">
            <div className="h-1/2 -z-10">
              <Image
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                src={coverimg2}
                alt="cover"
              />
            </div>
          </div>
        </div>
        <footer className="absolute -translate-x-1/2 bottom-24 md:bottom-10 left-1/2">
          <Link href="/home">
            <button className="py-4 font-bold uppercase rounded-full w-44 bg-curry text-licorice">
              start training
            </button>
          </Link>
        </footer>
      </main>
    </>
  );
};

export default Welcome;
