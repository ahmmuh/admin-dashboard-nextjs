"use client";
import React from "react";
import CustomLink from "../link";
import { deleteSpecialist } from "@/backend/api";

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
          <CustomLink
            className="bg-blue-400 text-white w-48 text-center p-2 rounded-xl shadow shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/dashboard/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
            title={"Uppdatera"}
          />
          <button
            onClick={() => deleteHandler(specialist._id)}
            className="bg-red-400 text-white text-center w-48 p-2 rounded-xl shadow shadow-red-300 hover:bg-red-600 transition duration-200">
            Ta bort
          </button>
        </>
      )}
    </div>
  );
}

export default SpecialistActions;
