"use client";
import React from "react";
import CustomLink from "../link";
import { deleteChef } from "@/backend/api";

function ActionsHandler({ unitId, chef }) {
  const deleteHandler = async (id) => {
    try {
      const chef = await deleteChef(unitId, id);
      console.log(`Chef ${id} has been deleted`);
      return chef;
    } catch (error) {
      console.log(
        `Fel vid borttagning av chef med ID ${id} message: ${error.message}`
      );
    }
  };
  return (
    <div className="flex gap-4 mt-6">
      {chef && (
        <>
          <CustomLink
            className="bg-blue-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/dashboard/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
            title={"Uppdatera"}
          />
          <button
            onClick={() => deleteHandler(chef._id)}
            className="bg-red-400 text-white text-center w-32 p-2 rounded-xl shadow-lg shadow-red-300 hover:bg-red-600 transition duration-200">
            Ta bort
          </button>
        </>
      )}
      {(chef === null || chef === undefined) && (
        <CustomLink
          className="bg-green-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-green-500 hover:bg-green-500 transition duration-200"
          title={"Ny chef"}
          url={`/dashboard/units/${unitId}/chefer/create`}
        />
      )}
    </div>
  );
}

export default ActionsHandler;
