"use client";

import React from "react";

function ButtonGroup({
  updateTitle,
  deleteTitle,
  updateHandler,
  deleteHandler,
}) {
  return (
    <div className="flex flex-row gap-4 my-4">
      <button
        onClick={updateHandler}
        className="bg-green-400 text-white p-2 w-32 rounded-xl shadow shadow-blue-200
        hover:bg-purple-300">
        {updateTitle}
      </button>
      <button
        onClick={deleteHandler}
        className="bg-red-400 text-white p-2 w-32 rounded-xl shadow shadow-blue-200
        hover:bg-purple-300">
        {deleteTitle}
      </button>
    </div>
  );
}

export default ButtonGroup;
