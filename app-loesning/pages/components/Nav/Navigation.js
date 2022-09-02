import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";
const Navigation = () => {
  const router = useRouter();
  const path = router.pathname.substring(1);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    if (toggle === true) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [toggle]);
  return (
    <>
      {path === "" || path === "/" ? null : (
        <header className="fixed top-0 left-0 right-0 z-50 p-5 ">
          <nav className="flex justify-between mt-2 list-none text-large">
            <li className="flex items-center ">
              {path === "home" ? (
                "Popular classes"
              ) : (
                <button
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <IoArrowBackSharp className="mr-2" />

                  {path}
                </button>
              )}
            </li>
            <li className="flex items-center">
              <motion.button
                animate={{ rotate: toggle ? "-180deg" : "0deg" }}
                onClick={() => setToggle(!toggle)}
                className="text-5xl text-ashe-dark"
              >
                {!toggle ? <HiMenuAlt3 /> : <MdClose />}
              </motion.button>
            </li>
          </nav>
        </header>
      )}

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ x: "100vw", clipPath: "circle(30px at 40px 40px)" }}
            animate={{
              x: 0,
              clipPath: "circle(1000px at 40px 40px)",
            }}
            exit={{ x: "100vw", clipPath: "circle(30px at 40px 40px)" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-screen h-screen z-[49] bg-white"
          >
            <AnimatePresence>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <li>Lorem.</li>
                <li>Tenetur?</li>
                <li>Dolorum!</li>
                <li>Voluptates.</li>
                <li>Veritatis?</li>
              </motion.ul>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
