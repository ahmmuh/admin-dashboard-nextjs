// "use client";

// import { useState, useEffect } from "react";
// import { clockIn, clockOut } from "@/backend/clockAPI";
// import { getWeekNumber } from "@/helper/weekNumber";

// export default function ClockInOut() {
//   const [numbers, setNumbers] = useState([]);
//   const [clockedIn, setClockedIn] = useState(false);
//   const [time, setTime] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info");

//   useEffect(() => {
//     const update = () => setTime(new Date());
//     update();
//     const interval = setInterval(update, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const showMessage = (msg, type = "info", duration = 5000) => {
//     setMessage(msg);
//     setMessageType(type);
//     setTimeout(() => setMessage(""), duration);
//   };

//   const handleClick = (num) => {
//     if (numbers.length < 4) setNumbers([...numbers, num]);
//   };

//   const handleClear = () => setNumbers([]);

//   const handleClockIn = async () => {
//     if (numbers.length !== 4) return showMessage("Fyll i 4 siffror!", "error");
//     const lastFour = numbers.join("");
//     setNumbers([]);
//     try {
//       const res = await clockIn(lastFour);
//       console.log("RES I HANDLECLOCKIN", res);
//       setClockedIn(true);
//       showMessage(res.message, "success"); // backend-meddelande
//     } catch (err) {
//       showMessage(err.response?.data?.message || err.message, "error");
//     }
//   };

//   const handleClockOut = async () => {
//     if (numbers.length !== 4) return showMessage("Fyll i 4 siffror!", "error");
//     const lastFour = numbers.join("");
//     setNumbers([]);
//     try {
//       const res = await clockOut(lastFour);
//       setClockedIn(false);
//       showMessage(res.message, "success"); // backend-meddelande
//     } catch (err) {
//       showMessage(err.response?.data?.message || err.message, "error");
//     }
//   };

//   const numPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
//   const messageColor =
//     messageType === "success"
//       ? "text-green-600"
//       : messageType === "error"
//       ? "text-red-600"
//       : "text-gray-800";

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row max-w-6xl mx-auto mt-10 px-4 gap-6">
//       {/* Sidebar */}
//       <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start pt-6 text-gray-800">
//         {/* Hårdkodad text ovanför klockan */}
//         <p className="text-2xl font-medium mb-4">Vänligen stämpla in/ut</p>

//         <div className="bg-gray-100 rounded-lg px-6 py-6 text-center w-full max-w-xs">
//           <p className="text-xl font-semibold mb-1">
//             Vecka {time ? getWeekNumber(time) : "---"}
//           </p>
//           <p className="text-2xl font-mono mb-1">
//             {time ? time.toLocaleDateString("sv-SE") : "---"}
//           </p>
//           <p className="text-3xl font-mono font-bold">
//             {time ? time.toLocaleTimeString("sv-SE") : "---"}
//           </p>
//         </div>

//         {/* Backend-meddelanden under klockan, större text */}
//         {message && (
//           <p
//             className={`${messageColor} font-semibold text-xl text-center mt-6`}>
//             {message}
//           </p>
//         )}
//       </div>

//       {/* NumPad + actions */}
//       <div className="w-full md:w-1/2 flex flex-col items-center">
//         <div className="text-center text-4xl mb-5 font-mono tracking-widest border-2 border-gray-300 rounded-lg py-6 px-4 w-full max-w-md h-24 flex items-center justify-center">
//           {numbers.length > 0
//             ? numbers.map((n, i) => (
//                 <span key={i} className="px-5">
//                   {n}
//                 </span>
//               ))
//             : "____"}
//         </div>

//         <div className="flex flex-wrap w-full max-w-md mb-4 gap-3 justify-center">
//           {numPad.map((n) => (
//             <button
//               key={n}
//               onClick={() => handleClick(n)}
//               className="flex-1 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] h-20 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-2xl font-bold shadow rounded transition-transform duration-150 hover:scale-105">
//               {n}
//             </button>
//           ))}
//         </div>

//         <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 mb-4">
//           <button
//             onClick={handleClear}
//             className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
//             Rensa
//           </button>
//           <button
//             onClick={handleClockIn}
//             className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
//             Stämpla in
//           </button>
//           <button
//             onClick={handleClockOut}
//             className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105">
//             Stämpla ut
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { clockIn, clockOut } from "@/backend/clockAPI";
import { getWeekNumber } from "@/helper/weekNumber";

export default function ClockInOut() {
  const [numbers, setNumbers] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [time, setTime] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const update = () => setTime(new Date());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const showMessage = (msg, type = "info", duration = 5000) => {
    setMessage(msg);
    setMessageType(type);
    if (duration > 0) {
      setTimeout(() => setMessage(""), duration);
    }
  };

  const handleClick = (num) => {
    if (numbers.length < 4) setNumbers([...numbers, num]);
  };

  const handleClear = () => setNumbers([]);

  const handleClockIn = async () => {
    if (numbers.length !== 4) return showMessage("Fyll i 4 siffror!", "error");

    const lastFour = numbers.join("");
    setNumbers([]);
    setLoading(true);

    // Direkt feedback
    showMessage("Bearbetar stämpling in...", "info", 0);

    try {
      const res = await clockIn(lastFour);
      setClockedIn(true);
      showMessage(res.message, "success");
    } catch (err) {
      showMessage(err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    if (numbers.length !== 4) return showMessage("Fyll i 4 siffror!", "error");

    const lastFour = numbers.join("");
    setNumbers([]);
    setLoading(true);

    // Direkt feedback
    showMessage("Bearbetar stämpling ut...", "info", 0);

    try {
      const res = await clockOut(lastFour);
      setClockedIn(false);
      showMessage(res.message, "success");
    } catch (err) {
      showMessage(err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const numPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const messageColor =
    messageType === "success"
      ? "text-green-600"
      : messageType === "error"
      ? "text-red-600"
      : "text-gray-800";

  return (
    <div className="min-h-screen flex flex-col md:flex-row max-w-6xl mx-auto mt-10 px-4 gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-start pt-6 text-gray-800">
        {/* Huvudrubrik beroende på state */}
        <p className="text-3xl font-semibold mb-4">
          {clockedIn ? "Tack för idag!" : "Välkommen! Vänligen stämpla in"}
        </p>

        {/* Klocka */}
        <div className="bg-gray-100 rounded-lg px-6 py-6 text-center w-full max-w-xs">
          <p className="text-xl font-semibold mb-1">
            Vecka {time ? getWeekNumber(time) : "---"}
          </p>
          <p className="text-2xl font-mono mb-1">
            {time ? time.toLocaleDateString("sv-SE") : "---"}
          </p>
          <p className="text-3xl font-mono font-bold">
            {time ? time.toLocaleTimeString("sv-SE") : "---"}
          </p>
        </div>

        {/* Backend/feedback-meddelanden */}
        {message && (
          <p
            className={`${messageColor} font-semibold text-xl text-center mt-6`}>
            {message}
          </p>
        )}
      </div>

      {/* NumPad + actions */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="text-center text-4xl mb-5 font-mono tracking-widest border-2 border-gray-300 rounded-lg py-6 px-4 w-full max-w-md h-24 flex items-center justify-center">
          {numbers.length > 0
            ? numbers.map((n, i) => (
                <span key={i} className="px-5">
                  {n}
                </span>
              ))
            : "____"}
        </div>

        <div className="flex flex-wrap w-full max-w-md mb-4 gap-3 justify-center">
          {numPad.map((n) => (
            <button
              key={n}
              onClick={() => handleClick(n)}
              className="flex-1 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] h-20 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-2xl font-bold shadow rounded transition-transform duration-150 hover:scale-105">
              {n}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row w-full max-w-md gap-3 mb-4">
          <button
            onClick={handleClear}
            disabled={loading}
            className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105 disabled:opacity-50">
            Rensa
          </button>
          <button
            onClick={handleClockIn}
            disabled={loading}
            className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105 disabled:opacity-50">
            Stämpla in
          </button>
          <button
            onClick={handleClockOut}
            disabled={loading}
            className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow rounded transition-transform duration-150 hover:scale-105 disabled:opacity-50">
            Stämpla ut
          </button>
        </div>
      </div>
    </div>
  );
}
