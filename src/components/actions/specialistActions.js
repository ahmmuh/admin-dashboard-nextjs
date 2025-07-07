"use client";
import React from "react";
import CustomLink from "../link";
import { deleteSpecialist } from "@/backend/api";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

function SpecialistActions({ unitId, specialist }) {
  console.log("DEBUG - unitId i SpecialistActions:", unitId);
  console.log("DEBUG - specialistId i SpecialistActions:", specialist._id);
  console.log("DEBUG - specialist objekt:", specialist);

  const deleteHandler = async (id) => {
    try {
      const deletedSpecialist = await deleteSpecialist(unitId, id);
      console.log(`specialist ${id} has been deleted`);
      return deletedSpecialist;
    } catch (error) {
      console.log(
        `Fel vid borttagning av specialist med ID ${id} message: ${error.message}`
      );
    }
  };
  return (
    <div className="flex gap-4 mt-6">
      {specialist && (
        <>
          <div className="flex gap-3 mt-4">
            {/* Uppdatera-knapp */}
            <Link
              href={`/dashboard/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              <HiOutlinePencilAlt className="w-5 h-5" />
              Uppdatera
            </Link>

            {/* Ta bort-knapp */}
            <button
              onClick={() => {
                if (
                  confirm(
                    "Är du säker på att du vill ta bort denna specialist?"
                  )
                ) {
                  deleteHandler(specialist._id);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
              <HiOutlineTrash className="w-5 h-5" />
              Ta bort
            </button>
          </div>
          {/* <CustomLink
            className="bg-blue-400 text-white w-48 text-center p-2 rounded-xl shadow shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/dashboard/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
            title={"Uppdatera"}
          />
          <button
            onClick={() => deleteHandler(specialist._id)}
            className="bg-red-400 text-white text-center w-48 p-2 rounded-xl shadow shadow-red-300 hover:bg-red-600 transition duration-200">
            Ta bort
          </button> */}
        </>
      )}
    </div>
  );
}

export default SpecialistActions;
