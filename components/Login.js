"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setisRegistered] = useState(false);
  const { signUp, login } = useAuth(); // Assuming you have a signup and login function in your context or utility
  const [authenticating, setAuthenticating] = useState(false);
  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return;
    }
    setAuthenticating(true);
    try {
      if (isRegistered) {
        console.log("Signing up a new user");
        await signUp(email, password);
      } else {
        console.log("Logging in an exisiting user");
        await login(email, password);
      }
    } catch (err) {
      console.log("Error in login/signup", err.message);
      alert(err.message);
    } finally {
      setAuthenticating(false);
    }
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl md:text-5xl ${fugaz.className}`}>
        {isRegistered ? "Register" : "Log-in"}
      </h3>
      <p>You&apos;re one step away</p>

      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        className="max-w-[350px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid rounded-xl focus:border-2 outline-none border-indigo-400 duration-200 hover:border-indigo-600"
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        className="max-w-[350px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid rounded-xl  focus:border-2 outline-none border-indigo-400 duration-200 hover:border-indigo-600"
        placeholder="password"
      />
      <div className="max-w-[350px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>

      <p className="text-center">
        {isRegistered
          ? "Already have an account?? "
          : "Don't have an account?? "}{" "}
        <button
          onClick={() => setisRegistered(!isRegistered)}
          className="text-indigo-600"
        >
          {isRegistered ? "Log-In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
