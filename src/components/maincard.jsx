import React from "react";

function MainCard({ title, children, ...props }) {
  return (
    <div
      className="flex flex-col  p-12 cursor-pointer mb-5 w-1/2 sm:w-full h-1/2  border-red-600-800 rounded-xl shadow-xl shadow-gray-200
    bg-slate-300 ">
      <h2 className="text-2xl font-mono font-bold text-purple-500 ">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default MainCard;
