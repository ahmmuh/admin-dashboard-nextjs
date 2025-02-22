"use client";

import Link from "next/link";
import React from "react";

function ButtonGroup({
  updateTitle,
  deleteTitle,
  updateHandler,
  deleteHandler,
  children,
}) {
  return (
    <div className="flex flex-row gap-4 my-4">
      <Link
        href=""
        onClick={updateHandler}
        className="bg-green-400 text-white p-2 w-32 rounded-xl shadow shadow-blue-200
        hover:bg-purple-300">
        {updateTitle}
      </Link>
      <Link
        href=""
        onClick={deleteHandler}
        className="bg-red-400 text-white p-2 w-32 rounded-xl shadow shadow-blue-200
        hover:bg-purple-300">
        {deleteTitle}
      </Link>
      {children}
    </div>
  );
}

export default ButtonGroup;
