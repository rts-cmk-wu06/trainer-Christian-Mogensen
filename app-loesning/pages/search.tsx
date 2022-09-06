import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Carousel } from "./home";

export async function getStaticProps() {
  const urlClasses = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes`;
  const urlTrainer = `${process.env.NEXT_PUBLIC_URL}/api/v1/trainers`;

  const resClasses = await fetch(urlClasses);
  const resTrainer = await fetch(urlTrainer);
  const classes = await resClasses.json();
  const trainers = await resTrainer.json();
  return {
    props: {
      classes,
      trainers,
    },
  };
}
const SearchItem = ({ children }: any) => (
  <p className="p-2 px-4 rounded-full bg-curry">{children}</p>
);
const SearchBar = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [results, setResults] = useState<any>();
  const [toggle, setToggle] = useState(false);

  const fetchClasses = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/classes`);

    const json = await res.json();
    setData(json);
    setResults(json);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const searchData = (pattern: any) => {
    if (!pattern) {
      setResults(data);
      return;
    }

    const fuse = new Fuse(data, {
      keys: ["className", "trainer.trainerName", "classDay", "classTime"],
    });

    const result = fuse.search(pattern);

    const matches: any = [];
    if (!result.length) {
      setResults(data);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setResults(matches);
    }
  };

  return (
    <div className="w-full">
      <div className="relative text-ashe-dark">
        <AiOutlineSearch className="absolute text-2xl -translate-y-1/2 top-1/2 left-3" />

        <input
          className="w-full p-4 pl-10 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
          placeholder="Search classes"
          onChange={(e) => {
            searchData(e.target.value), setToggle(true);
            if (e.target.value === "") {
              setToggle(false);
            }
          }}
        />
      </div>
      <div className="mt-3">
        {toggle && (
          <AnimatePresence>
            <motion.div
              key={results}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul className="overflow-y-auto flex flex-col w-full p-4 gap-2 border rounded-[30px] bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium">
                {results.map((item: any) => (
                  <Link key={item.id} href={`/classes/${item.id}`}>
                    <li
                      key={new Date() + item.id}
                      className="flex flex-wrap gap-2 pb-2 border-b last-of-type:border-none last-of-type:pb-0 border-ashe-medium"
                    >
                      <SearchItem>{item.className}</SearchItem>
                      <SearchItem>{item.trainer.trainerName}</SearchItem>
                      <SearchItem>{item.classDay}</SearchItem>
                      <SearchItem>{item.classTime}</SearchItem>
                    </li>
                  </Link>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

const Search: NextPage = ({ classes, trainers }: any) => {
  return (
    <>
      <Head>
        <title>Svendeprøve - search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen min-h-screen p-5 mt-20 overflow-x-hidden">
        <SearchBar data={classes} />
        <section className="mt-5">
          <h2 className="font-bold text-medium">Popular classes</h2>
          <Carousel data={classes} />
        </section>
        <section className="mt-5">
          <div className="capitalize">
            <h2 className="font-bold text-medium">popular trainers</h2>
            <div className="flex flex-col gap-4 mt-3">
              {trainers.map((trainer: any) => {
                const newurl = trainer.asset.url.replace(
                  "http://localhost:4000",
                  `${process.env.NEXT_PUBLIC_URL}`
                );
                return (
                  <div key={trainer.id} className="flex gap-4">
                    <div className="block overflow-hidden h-[120px] rounded-2xl">
                      <Image
                        width={120}
                        height={120}
                        loading="lazy"
                        objectFit="cover"
                        src={newurl}
                      />
                    </div>
                    <h3 className="mt-6 font-bold text-medium">
                      {trainer.trainerName}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
