"use client";
import React from "react";
import CustomLink from "../link";
import { deleteSpecialist } from "@/backend/api";

function SpecialistActions({ unitId, specialistId, specialist }) {
  console.log("DEBUG - unitId i SpecialistActions:", unitId);
  console.log("DEBUG - specialistId i SpecialistActions:", specialistId);
  console.log("DEBUG - specialist objekt:", specialist);

  const deleteHandler = async (id) => {
    try {
      const specialist = await deleteSpecialist(unitId, specialistId);
      console.log(`specialist ${id} has been deleted`);
      return specialist;
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
          <CustomLink
            className="bg-blue-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
            title={"Update specialist"}
          />
          <button
            onClick={() => deleteHandler(specialist._id)}
            className="bg-red-400 text-white text-center w-32 p-2 rounded-xl shadow-lg shadow-red-300 hover:bg-red-600 transition duration-200">
            Delete
          </button>
        </>
      )}
      {specialist === null ||
        (specialist === undefined && (
          <CustomLink
            className="bg-green-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-green-500 hover:bg-green-500 transition duration-200"
            title={"Ny specialist"}
            url={`/units/${unitId}/specialister/create`}
          />
        ))}
    </div>
  );
}

export default SpecialistActions;
