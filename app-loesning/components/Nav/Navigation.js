import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// statestore
const burgerAtom = atom(false);

const Navigation = () => {
  const router = useRouter();
  const pathSlugBool = router.pathname === "/classes/[classid]";

  const path = router.pathname.substring(1);
  const [toggle, setToggle] = useAtom(burgerAtom);
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
          <nav
            className={`flex justify-between mt-2 list-none text-large ${
              pathSlugBool && "text-white"
            }`}
          >
            <li className="flex items-center ">
              {path === "home" ? (
                "Popular classes"
              ) : path === "schedule" ? (
                <button
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <IoArrowBackSharp className="mr-2" />
                  My {path}
                </button>
              ) : pathSlugBool ? (
                <button
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <IoArrowBackSharp className="mr-2" />
                </button>
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
                className={`z-50 text-5xl text-ashe-dark ${
                  pathSlugBool && "text-white"
                }`}
              >
                {!toggle ? <HiMenuAlt3 /> : <MdClose />}
              </motion.button>
            </li>
          </nav>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: "-100vh",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  y: "-100vh",
                }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 right-0 w-screen h-screen z-[49] bg-white bg-opacity-75 backdrop-blur-md ${
                  pathSlugBool && "text-white bg-black"
                }`}
              >
                <AnimatePresence>
                  <motion.ul
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{
                      opacity: 1,
                      y: "0%",
                    }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.1 }}
                    className="flex flex-col items-center justify-center w-full h-full gap-2"
                  >
                    <BurgerItem>home</BurgerItem>
                    <BurgerItem>search</BurgerItem>
                    <BurgerItem>schedule</BurgerItem>
                    <button className="p-4 text-xl font-semibold capitalize">
                      {" "}
                      log out
                    </button>
                  </motion.ul>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}
    </>
  );
};

const BurgerItem = ({ children }) => {
  const [toggle, setToggle] = useAtom(burgerAtom);
  const router = useRouter();
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(router.pathname.substring(1) === children);
  }, [router.pathname]);
  return (
    <li
      onClick={(e) => {
        console.log(e.target);
        setToggle(!toggle);
      }}
      name={children}
      className={`p-4 text-xl font-semibold capitalize ${
        active && "bg-curry"
      } rounded-full`}
    >
      <Link href={`/${children}`}>{children}</Link>
    </li>
  );
};

export default Navigation;
