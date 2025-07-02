import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

// import { currentUser } from "../utils/index";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Head from "./head";
import Header from "@/components/Header";
const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Mooddle",
  description: "Track your mood daily with Mooddle for mooddle",
};

export default function RootLayout({ children }) {
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`text-indigo-500 ${fugaz.className}`}>Created with 💖💛</p>
    </footer>
  );

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body
          className={`  w-full max-w-[1200px] mx-auto text-sm sm:text-base min-h-screen flex flex-col ${openSans.variable} antialiased text-slate-800`}
        >
          <Header />
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
