import React from "react";

import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Button(props) {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={`border-2 border-solid rounded-full overflow-hiddenborder-indigo-600 transition-all duration-200 hover:opacity-60 cursor-pointer ${
        dark ? "text-white bg-indigo-600 " : "text-indigo-600"
      } ${full ? "grid place-items-center w-full" : ""}`}
    >
      <p
        className={`${fugaz.className} px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3`}
      >
        {text}
      </p>
    </button>
  );
}
