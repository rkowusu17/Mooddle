"use client";

import React, { useState } from "react";
import { gradients, baseRating, demoData } from "@/utils/index";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Calender(props) {
  const { demo, completeData, handleSetMood } = props;
  const now = new Date();
  const currentMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currentMonth]);
  // console.log("Selected month: " + selectedMonth);
  const [selectedYear, setSeletedYear] = useState(now.getFullYear());
  const numericMonth = monthsArr.indexOf(selectedMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};
  console.log(
    "This Months Data:",
    completeData?.[selectedYear]?.[selectedMonth]
  );

  function handleIncrementMonth(val) {
    if (numericMonth + val < 0) {
      setSeletedYear(selectedYear - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      setSeletedYear(selectedYear + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }
  //Props Here---

  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const numberOfDaysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + numberOfDaysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className=" grid grid-cols-3 gap-4">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="text-indigo-400 duration-200 hover:opacity-60 "
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={`${fugaz.className} text-center capitalize whitespace-nowrap textGradient`}
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(+1)}
          className="text-indigo-400 duration-200 hover:opacity-60 "
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>

      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > numberOfDaysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div key={dayIndex} className="bg-white" />;
                }

                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : data && dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";
                return (
                  <div
                    style={{ background: color }}
                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                      isToday ? "border-indigo-400" : "border-indigo-100"
                    } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                    key={dayIndex}
                  >
                    {console.log()}
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
