"use client";
import React from "react";
import { deleteSpecialist } from "@/backend/api";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";

function SpecialistActions({ unitId, specialist }) {
  console.log("DEBUG - unitId i SpecialistActions:", unitId);
  console.log("DEBUG - specialistId i SpecialistActions:", specialist._id);
  console.log("DEBUG - specialist objekt:", specialist);
  const { currentUser, loading } = useFetchCurrentUser();

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

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex gap-4 mt-6">
      <>
        <div className="flex gap-3 mt-4">
          {/* Uppdatera-knapp */}

          {(currentUser._id === specialist._id ||
            currentUser.role?.includes("Områdeschef") ||
            currentUser.role?.includes("Avdelningschef")) && (
            <Link
              href={`/dashboard/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              <HiOutlinePencilAlt className="w-5 h-5" />
              Uppdatera
            </Link>
          )}

          {!currentUser.role?.includes("Enhetschef") && (
            <>
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

              <Link
                href={`/dashboard/units/${unitId}/specialister/create`}
                className="flex items-center gap-2 px-4  bg-green-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
                <HiPlus className="w-5" />
                Lägg till ny specialare
              </Link>
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default SpecialistActions;
