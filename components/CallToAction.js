"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function CallToAction() {
  const { currentUser, setisRegistered } = useAuth();
  if (currentUser) {
    return (
      <div className="mx-auto max-w-[15rem] w-full">
        <Link href={"/dashboard"}>
          <Button full dark text="Go to dashboard" />
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="w-fit mx-auto grid grid-cols-2 gap-4">
        <Link href={"/dashboard"}>
          <Button text="Sign Up" clickHandler={() => setisRegistered(true)} />
        </Link>

        <Link href={"/dashboard"}>
          <Button
            text="Login"
            dark
            clickHandler={() => setisRegistered(false)}
          />
        </Link>
      </div>
    </div>
  );
}
