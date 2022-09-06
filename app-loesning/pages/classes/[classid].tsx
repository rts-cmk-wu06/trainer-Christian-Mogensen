import { assert } from "console";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../hooks/userContext";
import { StarRatingComp } from "../home";

const SingleClass: NextPage = ({ classes, trainers }: any) => {
  const router = useRouter();
  const { query } = router;
  const { classid } = query;
  const { isLoggedIn, contextToken } = useContext(LoginContext);

  const [trainerImg, setTrainerImg] = useState("");
  const classImg = classes?.asset?.url.replace(
    "http://localhost:4000",
    `${process.env.NEXT_PUBLIC_URL}`
  );
  useEffect(() => {
    trainers.filter((trainer: any) => {
      if (trainer.trainerName === classes.trainer.trainerName) {
        const newurl = trainer?.asset?.url.replace(
          "http://localhost:4000",
          `${process.env.NEXT_PUBLIC_URL}`
        );
        setTrainerImg(newurl);
      }
    });
  }, []);
  const [userIsSignedUp, setUserIsSignedUp] = useState([]);
  const [signupBool, setSignupBool] = useState<any>(null);
  const [testBool, setTestBool] = useState<any>(null);
  useEffect(() => {
    const userurl = `${process.env.NEXT_PUBLIC_URL}/api/v1/users/${isLoggedIn}`;
    fetch(userurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contextToken}`,
      },
    })
      .then((res) => res.json())
      .then((userdata) => {
        setUserIsSignedUp(userdata);
        userIsSignedUp?.filter((signed: any) => {
          if (signed.classes.id === classid) {
            setTestBool(signed.classes.id);
          }
        });
      });
  }, [trainerImg]);
  const [leave, setLeave] = useState<any>(null);
  function handleClassSignup() {
    const signUpUrl = `https://svendeproeve-christian.herokuapp.com/api/v1/users/${isLoggedIn}/classes/${classid}`;
    fetch(signUpUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${contextToken}` },
    })
      .then((res) => res.json())
      .then((data) => setSignupBool(data));
  }
  function handleClassLeave() {
    const signUpUrl = `https://svendeproeve-christian.herokuapp.com/api/v1/users/${isLoggedIn}/classes/${classid}`;
    fetch(signUpUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${contextToken}` },
    }).then((res) => setSignupBool(null));
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ scale: 0.8, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 40 }}
          transition={{ duration: 0.31 }}
          className="relative z-10 w-full h-[50vh]"
        >
          <div className="absolute top-0 left-0 w-full h-full">
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
          </div>
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
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-5"
        >
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
            {signupBool?.id ? (
              <button
                onClick={handleClassLeave}
                className="w-full py-4 mt-5 font-semibold uppercase rounded-full bg-curry"
              >
                leave
              </button>
            ) : (
              <button
                onClick={handleClassSignup}
                className="w-full py-4 mt-5 font-semibold uppercase rounded-full bg-curry"
              >
                sign up
              </button>
            )}
          </section>
        </motion.main>
      </AnimatePresence>
    </div>
  );
};

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes`;
  const res = await fetch(url);
  const data = await res.json();

  const paths = data.map((singleclass: any) => ({
    params: { classid: singleclass.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context: any) {
  const classid = context.params.classid;
  const classUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes`;
  const classRes = await fetch(`${classUrl}/${classid}`);
  const classData = await classRes.json();

  const trainerUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/trainers`;
  const trainerRes = await fetch(trainerUrl);
  const trainerData = await trainerRes.json();

  return { props: { classes: classData, trainers: trainerData } };
}

export default SingleClass;
