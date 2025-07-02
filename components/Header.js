"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fugaz_One } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import Logout from "./Logout";
import { usePathname } from "next/navigation";
import Button from "./Button";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const { currentUser } = useAuth();
  const pathname = usePathname();

  console.log(pathname);

  if (currentUser && pathname === "/") {
    return (
      <div className="p-2 flex items-center justify-between gap-4">
        <Link href={"/"}>
          <h1
            className={`${fugaz.className}  text-base sm:text-lg textGradient flex items-center `}
          >
            <Image
              className="rounded-2xl "
              src={"/images/Mooddle.png"}
              alt="header-image"
              width={150}
              height={50}
            />
            <p className="-ml-7">Mooddle</p>
          </h1>
        </Link>
        <Link href={"/dashboard"}>
          <Button text="Go to dashboard" />
        </Link>
      </div>
    );
  }

  if (currentUser && pathname === "/dashboard") {
    return (
      <div className="p-2 flex items-center justify-between gap-4">
        <Link href={"/"}>
          <h1
            className={`${fugaz.className}  text-base sm:text-lg textGradient flex items-center `}
          >
            <Image
              className="rounded-2xl "
              src={"/images/Mooddle.png"}
              alt="header-image"
              width={150}
              height={50}
            />
            <p className="-ml-7">Mooddle</p>
          </h1>
        </Link>
        <Logout />
      </div>
    );
  }

  return (
    <div className="p-2 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1
          className={`${fugaz.className}  text-base sm:text-lg textGradient flex items-center `}
        >
          <Image
            className="rounded-2xl "
            src={"/images/Mooddle.png"}
            alt="header-image"
            width={150}
            height={50}
          />
          <p className="-ml-7">Mooddle</p>
        </h1>
      </Link>
    </div>
  );
};

export default Header;
