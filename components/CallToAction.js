"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

export default function CallToAction() {
  const { currentUser } = useAuth();
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
          <Button text="Sign Up" />
        </Link>

        <Link href={"/dashboard"}>
          <Button text="Login" dark />
        </Link>
      </div>
    </div>
  );
}
