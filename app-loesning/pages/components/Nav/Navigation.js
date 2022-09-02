import { useRouter } from "next/router";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";

const Navigation = () => {
  const router = useRouter();
  const path = router.pathname.substring(1);
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
              <button className="text-5xl text-ashe-dark">
                <HiMenuAlt3 />
              </button>
            </li>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navigation;
