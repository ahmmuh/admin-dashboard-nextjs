"use client";
import React from "react";
import CustomLink from "../link";
import { deleteChef } from "@/backend/api";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

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
          {/* <CustomLink
            className="bg-blue-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/dashboard/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
            title={"Uppdatera"}
          />
          <button
            onClick={() => deleteHandler(chef._id)}
            className="bg-red-400 text-white text-center w-32 p-2 rounded-xl shadow-lg shadow-red-300 hover:bg-red-600 transition duration-200">
            Ta bort
          </button> */}

          <div className="flex gap-3 mt-4">
            {/* Uppdatera-knapp */}
            <Link
              href={`/dashboard/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              <HiOutlinePencilAlt className="w-5 h-5" />
              Uppdatera
            </Link>

            {/* Ta bort-knapp */}
            <button
              onClick={() => {
                if (confirm("Är du säker på att du vill ta bort denna chef?")) {
                  deleteHandler(apartment._id);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
              <HiOutlineTrash className="w-5 h-5" />
              Ta bort
            </button>
          </div>
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
