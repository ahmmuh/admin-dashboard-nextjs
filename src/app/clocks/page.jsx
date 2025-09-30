"use client";
import { clockIn } from "@/backend/clockAPI";
import { getWeekNumber } from "@/helper/weekNumber";
import { useEffect, useState } from "react";

export default function ClockInOut() {
  const [numbers, setNumbers] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);

  const handleClick = (num) => {
    if (numbers.length < 4) setNumbers([...numbers, num]);
  };

  const handleClear = () => setNumbers([]);

  const handleSubmit = async (type) => {
    
    if (numbers.length === 4) {
      const lastFour = numbers.join("");
      console.log(type, lastFour);

      try {
        const res = await clockIn()

        setClockedIn(type === "in");
        setNumbers([]);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Fyll i 4 siffror!");
    }
  };

  const numPadRows = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]];

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-6xl mx-auto mt-10 px-4 gap-6">
      {/* Sidebar */}
      <div className="md:w-1/2 flex items-start justify-start flex-col pt-6 text-2xl font-semibold text-gray-800 pl-6">
        <p>{clockedIn ? "Tack för idag" : "Välkommen Ahmed"}</p>

        <p className="text-sm">
          {new Date().toLocaleString("SV-se")} V {getWeekNumber()}
        </p>
      </div>

      {/* Content area */}
      <div className="md:w-1/2 flex flex-col items-center">
        {/* Visning av siffror */}
        <div className="text-center text-4xl mb-5 font-mono tracking-widest border-2 border-gray-300 rounded-lg py-6 px-4 w-full max-w-md h-24 flex items-center justify-center">
          {numbers.length > 0
            ? numbers.map((n, i) => (
                <span key={i} className="px-5">
                  {n}
                </span>
              ))
            : "____"}
        </div>

        {/* NumPad 3 per rad */}
        <div className="flex flex-col w-full max-w-md mb-4 gap-3">
          {numPadRows.map((row, idx) => (
            <div key={idx} className="flex gap-3 justify-center">
              {row.map((n) => (
                <button
                  key={n}
                  onClick={() => handleClick(n)}
                  className="flex-1 min-w-[90px] h-20 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-2xl font-bold shadow rounded transition-transform duration-150 hover:scale-105">
                  {n}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Action-knappar horisontell */}
        <div className="flex w-full max-w-md gap-3">
          <button
            onClick={handleClear}
            className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
            Rensa
          </button>
          <button
            onClick={() => handleSubmit("in")}
            className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
            Stämpla in
          </button>
          <button
            onClick={() => handleSubmit("out")}
            className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
            Stämpla ut
          </button>
        </div>
      </div>
    </div>
  );
}
