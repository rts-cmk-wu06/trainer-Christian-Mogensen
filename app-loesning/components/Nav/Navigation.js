import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdClose } from "react-icons/md";

// statestore
export const burgerAtom = atom(false);
export const userIdAtom = atom(null);
export const formAtom = atom(true);
export const pathAtom = atom("");

const Navigation = () => {
  const router = useRouter();
  const [toggle, setToggle] = useAtom(burgerAtom);
  const [pathSlugBool, setPathSlugBool] = useAtom(pathAtom);

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    setPathSlugBool(router.pathname === "/classes/[classid]");
  }, [router.pathname]);
  const path = router.pathname.substring(1);

  useEffect(() => {
    const body = document.querySelector("body");
    if (toggle === true) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [toggle]);

  const [form, setForm] = useAtom(formAtom);
  function handleForm() {
    setForm(!form);
  }

  function handleLogOut() {
    setIsLoggedIn({});
    sessionStorage.clear();
  }

  return (
    <>
      {path === "" || path === "/" ? null : (
        <header className="fixed top-0 left-0 right-0 z-50 p-5 standalone:top-5 ">
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
                className={`fixed top-0 right-0 w-screen h-screen z-[49] bg-opacity-75 backdrop-blur-md ${
                  pathSlugBool ? "text-white bg-black" : "text-black bg-white"
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
                      {isLoggedIn.id && <BurgerItem>schedule</BurgerItem>}
                      {isLoggedIn.id ? (
                        <button
                          onClick={handleLogOut}
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
          <div
            className={`z-50 rounded-full fixed w-5 h-5 bottom-5 right-5 ${
              isLoggedIn.id ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
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
      onClick={() => {
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

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../hooks/userContext";
import { schema } from "../../lib/userValidation";

const loginAtom = atom(false);
const LoginComp = () => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const [login, setLogin] = useAtom(loginAtom);
  const [pathSlugBool] = useAtom(pathAtom);
  const [form, setForm] = useAtom(formAtom);
  const [errormsg, setErrormsg] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data, e) => {
    fetch(process.env.NEXT_PUBLIC_URL + "/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("userid", data.userId);
        sessionStorage.setItem("usertoken", data.token);
        setIsLoggedIn({ id: data.userId, token: data.token });

        if (data.userId) {
          setForm(!form);
        }
      })
      .catch((err) => setErrormsg("Error: " + err.message));
    reset();
  };

  function handleForm() {
    setLogin(!login);
  }

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
              className="absolute w-full p-5 top-1/3"
            >
              <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full">
                <div className="w-full gap-5">
                  <h2 className="text-xl font-semibold">
                    Enter your credentials
                  </h2>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="username"
                      {...register("username")}
                      autoComplete="off"
                      className="w-full p-4 pl-10 mt-4 text-black border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                      placeholder="Enter your username..."
                    />
                    {errors.username?.message && (
                      <ErrMsg>{errors.username?.message}</ErrMsg>
                    )}
                  </div>
                  <div className="relative block w-full">
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      {...register("password")}
                      className="w-full p-4 pl-10 mt-4 text-black border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                      placeholder="Enter your password..."
                    />
                    {errors.password?.message && (
                      <ErrMsg>{errors.password?.message}</ErrMsg>
                    )}
                  </div>
                </div>
                {errormsg && <p>{errormsg}</p>}
                <button
                  type="submit"
                  className="w-full py-4 mt-5 font-semibold text-black uppercase rounded-full bg-curry"
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
              className="absolute w-full p-5 top-1/3"
            >
              <form className="w-full">
                <div className="w-full gap-5">
                  <h2 className="text-xl font-semibold">Create your user</h2>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="username"
                      // {...register("username")}
                      autoComplete="off"
                      className="w-full p-4 pl-10 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                      placeholder="Enter your username..."
                    />
                    {/* {errors.username?.message && (
                      <ErrMsg>{errors.username?.message}</ErrMsg>
                    )} */}
                  </div>

                  <div className="relative block w-full">
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      // {...register("password")}
                      className="w-full p-4 pl-10 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                      placeholder="Enter your password..."
                    />
                    {/* {errors.password?.message && (
                      <ErrMsg>{errors.password?.message}</ErrMsg>
                    )} */}
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="confirmpassword"
                      // {...register("confirmpassword")}
                      autoComplete="off"
                      className="w-full p-4 pl-10 mt-4 border rounded-full bg-ashe-light outline-ashe-medium outline-2 border-ashe-medium"
                      placeholder="Confirm your password..."
                    />
                    {/* {errors.confirmpassword?.message && (
                      <ErrMsg>{errors.confirmpassword?.message}</ErrMsg>
                    )} */}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 mt-5 font-semibold text-black uppercase rounded-full bg-curry"
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
const ErrMsg = ({ children }) => (
  <motion.p
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    layout
    className="absolute right-0 p-2 border rounded-full text-curry -bottom-3 text-smallest bg-licorice border-curry"
  >
    {children}
  </motion.p>
);

export default Navigation;
