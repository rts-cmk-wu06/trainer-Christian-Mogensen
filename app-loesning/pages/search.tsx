import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Carousel } from "./home";

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

const Search: NextPage = ({ classes, trainers }: any) => {
  console.log(trainers);
  return (
    <>
      <Head>
        <title>Svendeprøve - search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen min-h-screen p-5 mt-20 overflow-x-hidden">
        <section>
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
