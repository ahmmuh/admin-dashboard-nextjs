import React from "react";

function MainCard({ title, children, ...props }) {
  return (
    <div
      className="flex flex-col  p-12 cursor-pointer w-1/2  h-1/2  border-red-600-800 rounded-xl shadow-2xl shadow-blue-300
    bg-slate-300 hover:bg-slate-400 ">
      <h2 className="text-2xl font-mono font-bold text-purple-500">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

export default MainCard;
