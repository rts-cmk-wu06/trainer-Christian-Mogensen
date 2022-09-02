import Fuse from "fuse.js";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Carousel } from "./home";
import { AiOutlineSearch } from "react-icons/ai";

export async function getStaticProps() {
  const urlClasses = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/classes`;
  const urlTrainer = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/trainers`;

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
  <li className="p-2 px-4 rounded-full bg-curry">{children}</li>
);
const SearchBar = (props: any) => {
  const [data, setData] = useState<any>(props.data);
  //   const [results, setResults] = useState<any>([]); // <-- results state
  //   const fetchStudents = async () => {
  //     const res = await fetch("");
  //     const json = await res.json();
  //     setData(json.students);
  //     setResults(json.students); // <-- seed the results state
  //   };

  //   useEffect(() => {
  //     setData(classes);
  //     console.log(classes);
  //   }, []);

  //   const searchData = (pattern: any) => {
  //     if (!pattern) {
  //       setResults(data); // <-- reset to full data state
  //       return;
  //     }

  //     const fuse = new Fuse(data, {
  //       // <-- use data state
  //       keys: ["className"],
  //     });

  //     const result = fuse.search(pattern);
  //     const matches: any = [];
  //     if (!result.length) {
  //       setResults(data); // <-- reset to full data state
  //     } else {
  //       result?.forEach(({ item }) => {
  //         matches?.push(item);
  //       });
  //       setResults(matches); // <-- update results state
  //     }
  //   };

  return (
    <div className="w-full">
      <div className="relative text-ashe-dark">
        <AiOutlineSearch className="absolute text-2xl -translate-y-1/2 top-1/2 left-3" />

        <input
          className="w-full p-4 pl-10 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
          // value={data}
          placeholder="Search classes"
          // onChange={(e) => searchData(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <ul className=" h-[350px] md:h-auto overflow-y-auto flex flex-col w-full p-4 gap-2 border rounded-[30px] bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium">
          {data.map((item: any) => (
            <li className="flex flex-wrap gap-2 pb-2 border-b last-of-type:border-none last-of-type:pb-0 border-ashe-medium">
              <SearchItem>{item.className}</SearchItem>
              <SearchItem>{item.trainer.trainerName}</SearchItem>
              <SearchItem>{item.classDay}</SearchItem>
              <SearchItem>{item.classTime}</SearchItem>
            </li>
          ))}
        </ul>
      </div>
      {/* {results?.map((item: any) => console.log(item))} */}
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
              {trainers.map(
                (trainer: any) => (
                  <div key={trainer.id} className="flex gap-4">
                    <div className="block overflow-hidden h-[120px] rounded-2xl">
                      <Image
                        width={120}
                        height={120}
                        loading="lazy"
                        objectFit="cover"
                        src={trainer.asset.url}
                      />
                    </div>
                    <h3 className="mt-6 font-bold text-medium">
                      {trainer.trainerName}
                    </h3>
                  </div>
                )
                //   console.log(trainer.asset.url, trainer.trainerName)
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
