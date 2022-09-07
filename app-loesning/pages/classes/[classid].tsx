import { assert } from "console";
import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../hooks/userContext";
import { StarRatingComp } from "../home";
import Slider from "react-input-slider";

const SingleClass: NextPage = ({ classes, trainers, rating }: any) => {
  const router = useRouter();
  const { query } = router;
  const { classid } = query;
  const { isLoggedIn } = useContext(LoginContext);
  const [signupBool, setSignupBool] = useState<any>(null);
  const [trainerImg, setTrainerImg] = useState("");

  const classImg = classes?.asset?.url.replace(
    "http://localhost:4000",
    `${process.env.NEXT_PUBLIC_URL}`
  );
  useEffect(() => {
    trainers.filter((trainer: any) => {
      if (trainer?.trainerName === classes?.trainer?.trainerName) {
        const newurl = trainer?.asset?.url.replace(
          "http://localhost:4000",
          `${process.env.NEXT_PUBLIC_URL}`
        );
        setTrainerImg(newurl);
      }
    });
  }, []);

  function handleClassSignup() {
    const signUpUrl = `https://svendeproeve-christian.herokuapp.com/api/v1/users/${isLoggedIn.id}/classes/${classid}`;
    fetch(signUpUrl, {
      method: "POST",
      headers: { Authorization: `Bearer ${isLoggedIn.token}` },
    })
      .then((res) => res.json())
      .then((data) => setSignupBool(data));
  }
  function handleClassLeave() {
    const signUpUrl = `https://svendeproeve-christian.herokuapp.com/api/v1/users/${isLoggedIn.id}/classes/${classid}`;
    fetch(signUpUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${isLoggedIn.token}` },
    }).then((res) => setSignupBool(null));
  }
  // Logic to calculate rating numbers to avg with a ceil method - needed for rating
  let sum = rating
    .map((item: any) => item.rating)
    .reduce((prev: any, curr: any) => prev + curr, 0);
  let avg = sum / rating.length;
  let noDecimalAvg = Math.ceil(avg);
  const ratingnumber = noDecimalAvg;
  const [rateOverlay, setRateOverlay] = useState(false);

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
                <StarRatingComp ratingVal={ratingnumber} />
                <p className="font-bold">{ratingnumber}/5</p>
              </div>
              {isLoggedIn.id && (
                <button
                  onClick={() => setRateOverlay(!rateOverlay)}
                  className="p-2 px-6 font-bold uppercase border-2 rounded-full border-curry text-curry"
                >
                  rate
                </button>
              )}
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
            {isLoggedIn.id && (
              <>
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
              </>
            )}
          </section>
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {rateOverlay && (
          <RateOverlayComp
            overlay={rateOverlay}
            classtitle={classes.className}
            fun={setRateOverlay}
            classNumber={classid}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const RateOverlayComp = ({ overlay, fun, classtitle, classNumber }: any) => {
  const [rating, setRating] = useState({ x: 3 });
  function changeHandler({ x }: any) {
    setRating((rating) => ({ ...rating, x }));
  }
  const { isLoggedIn, contextToken } = useContext(LoginContext);
  const [success, setSuccess] = useState(false);
  function handleRating(e: any) {
    e.preventDefault();
    const rateUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${classNumber}/ratings`;
    fetch(rateUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isLoggedIn.token}`,
      },
      body: JSON.stringify({
        userId: isLoggedIn.id,
        rating: rating.x,
      }),
    })
      .then((res) => {
        res.ok && setSuccess(!success);
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 1 }}
      onClick={() => fun(!overlay)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="w-full px-5">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full p-5 text-center bg-white rounded-md"
            >
              <p>Thanks for your vote!</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!success && (
            <motion.form
              initial={{ x: "150%" }}
              animate={{ x: 0 }}
              exit={{ x: "150%" }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col items-center w-full gap-5 p-5 text-center bg-white rounded-md"
            >
              <label className="">Rate the {classtitle} class</label>
              <StarRatingComp ratingVal={rating.x} />
              <Slider
                xmin={0}
                xmax={5}
                x={rating.x}
                onChange={changeHandler}
                styles={{
                  track: {
                    backgroundColor: "#cecece",
                    height: "2px",
                  },
                  active: {
                    backgroundColor: "#000000",
                  },
                  thumb: {
                    width: 15,
                    height: 15,
                    backgroundColor: `rgb(${241},${196},${14})`,
                  },
                  disabled: {
                    opacity: 0.5,
                  },
                }}
              />

              <button
                type="submit"
                onClick={handleRating}
                className="w-full py-4 mt-5 font-semibold uppercase rounded-full bg-curry"
              >
                save your rating
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
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

  const ratingUrl = `${process.env.NEXT_PUBLIC_URL}/api/v1/classes/${classid}/ratings`;
  const ratingRes = await fetch(ratingUrl);
  const ratingData = await ratingRes.json();

  return {
    props: { classes: classData, trainers: trainerData, rating: ratingData },
  };
}

export default SingleClass;
