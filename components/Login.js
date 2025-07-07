"use client";

import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Eye, EyeClosed } from "lucide-react";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, login, isRegistered, setisRegistered } = useAuth(); // Assuming you have a signup and login function in your context or utility
  const [authenticating, setAuthenticating] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return toast(
        <div>
          <p>Kindly check your email and password</p>
          <p className="font-bold text-red-400">
            password should be more than 6
          </p>
        </div>
      );
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
      toast(
        <div>
          <p className="font-bold text-red-500 text-center">
            Kindly check your email and password
          </p>
          <p className="text-left text-base">{err.message}</p>
        </div>
      );
    } finally {
      setAuthenticating(false);
    }
  }
  return (
    <div className=" relative flex flex-col flex-1 justify-center items-center gap-4">
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

      <div className="w-full max-w-[350px] relative flex justify-center items-center ">
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPass ? "text" : "password"}
          className="max-w-[350px] w-full mx-auto px-4 py-2 sm:py-3 border border-solid rounded-xl  focus:border-2 outline-none border-indigo-400 duration-200 hover:border-indigo-600"
          placeholder={`password should be more than 6`}
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? <EyeClosed /> : <Eye />}
        </button>
      </div>
      <div className="max-w-[350px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <ToastContainer position="top-center" autoClose="6000" />

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
