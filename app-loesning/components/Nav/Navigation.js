import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// statestore
export const burgerAtom = atom(false);
export const userAtom = atom(false);
export const formAtom = atom(true);
export const pathAtom = atom("");
const Navigation = () => {
  const router = useRouter();

  const [pathSlugBool, setPathSlugBool] = useAtom(pathAtom);
  useEffect(() => {
    setPathSlugBool(router.pathname === "/classes/[classid]");
  }, [router.pathname]);
  const path = router.pathname.substring(1);
  const [toggle, setToggle] = useAtom(burgerAtom);
  const [user, setUser] = useAtom(userAtom);
  useEffect(() => {
    const body = document.querySelector("body");
    if (toggle === true) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [toggle]);

  function handleUser() {
    setUser(null);
  }
  const [form, setForm] = useAtom(formAtom);
  function handleForm() {
    setForm(!form);
  }
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
              {!form ? (
                <motion.button
                  onClick={() => setForm(!form)}
                  className={`z-50 text-5xl text-ashe-dark ${
                    pathSlugBool && "text-white"
                  }`}
                >
                  <IoArrowBackSharp />
                </motion.button>
              ) : (
                <motion.button
                  animate={{ rotate: toggle ? "-180deg" : "0deg" }}
                  onClick={() => setToggle(!toggle)}
                  className={`z-50 text-5xl text-ashe-dark ${
                    pathSlugBool && "text-white"
                  }`}
                >
                  {!toggle ? <HiMenuAlt3 /> : <MdClose />}
                </motion.button>
              )}
            </li>
          </nav>
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: "100vw",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  x: "-100vh",
                }}
                transition={{ duration: 0.3 }}
                className={`fixed top-0 right-0 w-screen h-screen z-[49] bg-white bg-opacity-75 backdrop-blur-md ${
                  pathSlugBool && "text-white bg-black"
                }`}
              >
                <AnimatePresence mode="wait">
                  {form ? (
                    <motion.ul
                      initial={{ x: "100%" }}
                      animate={{
                        x: "0%",
                      }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center w-full h-full gap-2"
                    >
                      <BurgerItem>home</BurgerItem>
                      <BurgerItem>search</BurgerItem>
                      <BurgerItem>schedule</BurgerItem>
                      {user ? (
                        <button
                          onClick={handleUser}
                          className="p-4 text-xl font-semibold capitalize"
                        >
                          Log out
                        </button>
                      ) : (
                        <button
                          onClick={handleForm}
                          className="p-4 text-xl font-semibold capitalize"
                        >
                          Log in
                        </button>
                      )}
                    </motion.ul>
                  ) : (
                    <motion.div
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full"
                    >
                      <LoginComp />
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* <AnimatePresence mode="wait">
                  {!form && }
                </AnimatePresence> */}
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

const LoginComp = () => {
  const [login, setLogin] = useState(false);
  function handleForm() {
    setLogin(!login);
  }
  const [pathSlugBool] = useAtom(pathAtom);
  return (
    <>
      <header className="absolute z-10 top-20 left-5">
        <h1 className="font-bold leading-[3.5rem] capitalize text-largest block text-curry">
          <span className="block"> believe</span> yourself
        </h1>
        <h2
          className={`relative mt-4 font-bold text-black text-large   ${
            pathSlugBool && "text-white whitebar"
          }`}
        >
          Train like a pro
        </h2>
      </header>
      <div
        className={`flex flex-col items-center w-full h-full text-black bg-opacity-10 bg-white ${
          pathSlugBool && "text-white bg-black"
        }`}
      >
        <AnimatePresence mode="wait">
          {!login && (
            <motion.div
              key={"form"}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="absolute p-5 top-1/3"
            >
              <form>
                <div className="gap-5 ">
                  <label className="text-xl font-semibold">
                    Enter your credentials
                  </label>
                  <input
                    className="w-full p-4 pl-10 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                    placeholder="Enter your email..."
                  />
                  <input
                    className="w-full p-4 pl-10 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                    placeholder="Enter your password..."
                  />
                </div>
                <button
                  className="w-full py-4 mt-5 font-semibold text-black uppercase rounded-full bg-curry"
                  type="submit"
                >
                  Log in
                </button>
              </form>
              <button
                onClick={handleForm}
                className="w-full mx-auto mt-5 text-center"
              >
                Dont have an account, click here
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {login && (
            <motion.div
              key={"form"}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="absolute p-5 top-1/3"
            >
              <form>
                <div className="gap-5 ">
                  <label className="text-xl font-semibold">
                    Create your user
                  </label>
                  <input
                    className="w-full p-4 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                    placeholder="Enter your email..."
                  />
                  <input
                    className="w-full p-4 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                    placeholder="Enter your password..."
                  />
                  <input
                    className="w-full p-4 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                    placeholder="Confirm your password..."
                  />
                </div>
                <button
                  className="w-full py-4 mt-5 font-semibold text-black uppercase rounded-full bg-curry"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
              <button
                onClick={handleForm}
                className="w-full mx-auto mt-5 text-center"
              >
                Allready have an account, click here
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;