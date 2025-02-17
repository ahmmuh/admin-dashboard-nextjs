import React from "react";

function Card({ title, children }) {
  return (
    <div
      className="flex flex-col p-10 w-96 bg-white border-red-600-800 rounded-xl shadow-xl shadow-blue-300
    hover:bg-slate-400">
      <h3 className="text-xl p-3">{title}</h3>
      <div className="text-center ">{children}</div>
    </div>
  );
}

export default Card;
