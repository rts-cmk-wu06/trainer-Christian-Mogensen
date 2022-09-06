import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { LoginContext, useUserContext } from "../hooks/userContext";
const userClass: any = {
  classes: [
    {
      className: "Yoga",
      classDay: "Monday",
      classTime: "10:00",
      Roster: {
        classId: 1,
      },
    },
    {
      className: "Pump it up",
      classDay: "Tuesday",
      classTime: "17:00",
      Roster: {
        classId: 2,
      },
    },
    {
      className: "Yoga",
      classDay: "Wednesday",
      classTime: "15:00",
      Roster: {
        classId: 3,
      },
    },
    {
      className: "Pump it up",
      classDay: "Friday",
      classTime: "17:30",
      Roster: {
        classId: 4,
      },
    },
    {
      className: "Get fit or die trying, whatever you want and more text",
      classDay: "Friday",
      classTime: "17:30",
      Roster: {
        classId: 5,
      },
    },
  ],
};
const Schedule: NextPage = () => {
  const [data, setData] = useState<any>([]);
  const { isLoggedIn, contextToken } = useContext(LoginContext);
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
        setData(userdata);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Svendeprøve - schedule</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen min-h-screen p-5 mt-20 overflow-x-hidden standalone:mt-28">
        <ul>
          {data?.classes?.map((item: any, i: number) => (
            <ClassItem key={i}>
              <Link href={`/classes/${item?.Roster?.classId}`}>
                <a>
                  <h3 className="text-xl font-semibold truncate">
                    {item?.className}
                  </h3>
                  <h4 className="mt-3">
                    {item?.classDay} - {item?.classTime}
                  </h4>
                </a>
              </Link>
            </ClassItem>
          ))}
        </ul>
      </div>
    </>
  );
};
const ClassItem = ({ children }: any) => {
  return (
    <li className="p-3 px-5 mt-3 text-black border first-of-type:mt-0 bg-ashe-light border-ashe-dark rounded-2xl">
      {children}
    </li>
  );
};

export default Schedule;
