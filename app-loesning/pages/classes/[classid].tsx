import { assert } from "console";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { StarRatingComp } from "../home";

const SingleClass: NextPage = ({ classes, trainers }: any) => {
  const [trainerImg, setTrainerImg] = useState("");
  const classImg = classes?.asset?.url;
  useEffect(() => {
    trainers.filter((trainer: any) => {
      if (trainer.trainerName === classes.trainer.trainerName) {
        setTrainerImg(trainer?.asset?.url);
      }
    });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="relative w-full bg-red-500 h-[50vh]">
        {classImg ? (
          <Image
            src={classImg}
            priority={true}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-ashe-medium"></div>
        )}
        <div className="absolute inset-0 z-10 bg-opacity-50 bg-licorice" />
        <header className="absolute bottom-0 z-20 flex flex-col justify-between w-full p-5 text-curry">
          <h1 className="w-3/4 font-bold leading-none text-largest">
            {classes.className}
          </h1>
          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-5">
              <StarRatingComp />
              <p className="font-bold">5/5</p>
            </div>
            <button className="p-2 px-6 font-bold uppercase border-2 rounded-full border-curry text-curry">
              rate
            </button>
          </div>
        </header>
      </div>
      <main className="p-5">
        <h2 className="text-medium">
          {classes.classDay} - {classes.classTime}
        </h2>
        <p className="mt-5">{classes.classDescription}</p>
        <section className="mt-5">
          <h2 className="font-bold text-large">Trainer</h2>
          <div className="flex gap-5 mt-3">
            <div className="w-24 h-24 overflow-hidden rounded-[20px]">
              {trainerImg ? (
                <Image
                  src={trainerImg}
                  width={200}
                  height={200}
                  layout="responsive"
                  loading="lazy"
                  objectFit="cover"
                />
              ) : (
                <div className="w-full h-full bg-ashe-medium"></div>
              )}
            </div>
            <h3 className="relative font-bold top-5">
              {classes.trainer.trainerName}
            </h3>
          </div>
          <button className="w-full py-4 mt-5 font-semibold uppercase rounded-full bg-curry">
            sign up
          </button>
        </section>
      </main>
    </div>
  );
};

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/classes`;
  const res = await fetch(url);
  const data = await res.json();

  const paths = data.map((singleclass: any) => ({
    params: { classid: singleclass.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const classid = context.params.classid;
  const classUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/classes`;
  const classRes = await fetch(`${classUrl}/${classid}`);
  const classData = await classRes.json();

  const trainerUrl = `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/v1/trainers`;
  const trainerRes = await fetch(trainerUrl);
  const trainerData = await trainerRes.json();

  // Pass post data to the page via props
  return { props: { classes: classData, trainers: trainerData } };
}

export default SingleClass;
