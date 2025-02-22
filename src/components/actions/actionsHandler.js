"use client";
import Link from "next/link";
import React from "react";
import CustomLink from "../link";

function ActionsHandler({ unitId, chef }) {
  // const deleteHandler = () => {};
  return (
    <div className="flex gap-4 mt-6">
      <CustomLink
        url={""}
        className="bg-red-400 text-white text-center w-32 p-2 rounded-xl shadow-lg shadow-red-300 hover:bg-red-600 transition duration-200"
        title={"Delete"}
      />

      <CustomLink
        className="bg-blue-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-blue-500 hover:bg-blue-600 transition duration-200"
        url={`/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
        title={"Update Chef"}
      />

      <CustomLink
        className="bg-green-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-green-500 hover:bg-green-500 transition duration-200"
        title={"Ny chef"}
        url={`/units/${unitId}/chefer/create`}
      />
    </div>
  );
}

export default ActionsHandler;
