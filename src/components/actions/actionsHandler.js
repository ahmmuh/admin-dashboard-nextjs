"use client";
import Link from "next/link";
import React from "react";

function ActionsHandler({ unitId, chef }) {
  // const deleteHandler = () => {};
  return (
    <div className="flex gap-4 mt-6">
      <Link
        href={""}
        className="bg-red-500 text-white w-32 text-center p-2 rounded-xl shadow shadow-blue-400 hover:bg-slate-500 ">
        Delete
      </Link>
      <Link
        className="bg-blue-500 text-white w-32 text-center p-2 rounded-xl shadow shadow-blue-400 hover:bg-slate-500 "
        href={`/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}>
        Redigera chef
      </Link>
    </div>
  );
}

export default ActionsHandler;
