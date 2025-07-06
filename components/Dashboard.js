"use client";

import { Fugaz_One } from "next/font/google";
import { useEffect, useState } from "react";
import React from "react";
import Calender from "./Calender";
import { useAuth } from "@/context/AuthContext";
import { average, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

// import { auth } from "@/firebase";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});
const now = new Date();

export default function Dashboard() {
  const { currentUser, userDataObject, setUserDataObject, loading } = useAuth();
  const [data, setData] = useState({});

  function countValues() {
    let totalNumberOfDays = 0;
    let sumMoods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let daysMood = data[year][month][day];
          totalNumberOfDays++;
          sumMoods += daysMood; // Assuming mood is a number
        }
      }
    }
    return {
      num_of_days: totalNumberOfDays,
      average_Mood: (sumMoods / totalNumberOfDays).toFixed(2),
    };
  }

  const statuses = {
    ...countValues(),
    time_remaning: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      //Update firebase
      const newData = { ...userDataObject };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      //Update the current state
      setData(newData);

      //Update the global state
      setUserDataObject(newData);
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Failed to set data " + err.message);
    }
  }

  const moods = {
    "Stressed &*@#": ["😭", "#e33b0c"],
    Sad: ["🥲", "#ff6f00"],
    Existing: ["🙂", "#FFD60A"],
    Good: ["☺️", "#5AC8FA"],
    Elated: ["😍", "#007AFF"],
  };

  useEffect(() => {
    if (!currentUser || !userDataObject) {
      return;
    }
    setData(userDataObject);
  }, [currentUser, userDataObject]);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }

  return (
    //Returning status bar
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {Object.keys(statuses).map((status, index) => {
          return (
            <div key={index} className=" flex flex-col gap-1 sm:gap-3 ">
              <p className="truncate capitalize font-medium text-xs sm:text-sm">
                {status.replaceAll("_", " ")}
              </p>
              <p className={`text-base sm:text-sm ${fugaz.className} truncate`}>
                {status && statuses[status]}
                {status === "num_of_days" ? "🔥" : " "}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={`text-4xl sm:text-5xl md:text-6xl text-center ${fugaz.className}`}
      >
        How do you <span className="textGradient">feel</span> today
      </h4>

      {/* Rendering moods button */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.entries(moods).map(([mood, [emoji, bcolor]], index) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = index + 1;
                handleSetMood(currentMoodValue);
              }}
              key={index}
              className={`text-center p-4 rounded-2xl purpleShadow cursor-pointer duration-200 bg-indigo-50  hover:bg-indigo-100 flex flex-col gap-1.5 ${
                index === 4 ? "col-span-2 sm:col-span-1" : " "
              }`}
              style={{ border: `2px solid ${bcolor}` }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl">{emoji}</p>
              <p className={`${fugaz.className} text-indigo-500`}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calender completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
}
