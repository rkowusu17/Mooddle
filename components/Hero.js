import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calender from "./Calender";
import Link from "next/link";
import CallToAction from "./CallToAction";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-4 sm:gap-8">
      <h1
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className}`}
      >
        <span className="textGradient">Mooddle</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="w-full mx-auto max-w-[38rem]text-lg sm:text-xl md:text-2xl text-center">
        Create your mood record to see how you feel on{" "}
        <span className="font-semibold">daily, for every year</span>
      </p>
      <CallToAction />
      <Calender demo />
    </div>
  );
}
