import React from "react";

function Card({ title, children }) {
  return (
    <div
      className="flex flex-col py-2 px-10 w-96 h-1-/2 bg-white border-red-600-800 rounded-xl shadow-xl shadow-blue-300
    hover:bg-slate-400">
      <h3 className="text-xl p-3">{title}</h3>
      <div className=" ">{children}</div>
    </div>
  );
}

export default Card;
