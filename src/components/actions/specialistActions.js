"use client";
import React from "react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { deleteUser } from "@/backend/userAPI";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";

function SpecialistActions({ unitId, specialist, onDelete }) {
  const { currentUser, loading } = useFetchCurrentUser();

  const deleteHandler = async (id) => {
    if (!confirm("Är du säker på att du vill ta bort denna specialist?"))
      return;
    try {
      await deleteUser(id);
      onDelete(id); // ta bort från parent state
      console.log(`Specialist ${id} har tagits bort`);
    } catch (error) {
      console.error(`Fel vid borttagning av specialist ${id}:`, error.message);
    }
  };

  if (loading) return null;

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div className="flex gap-4 mt-6">
      {isManager && (
        <Link
          href={`/dashboard/units/${unitId}/specialister/edit/?specialistId=${specialist._id}&name=${specialist.name}&phone=${specialist.phone}&email=${specialist.email}`}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
          <HiOutlinePencilAlt className="w-5 h-5" />
          Uppdatera
        </Link>
      )}

      {isManager && (
        <>
          <button
            onClick={() => deleteHandler(specialist._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
            <HiOutlineTrash className="w-5 h-5" />
            Ta bort
          </button>

          {/* <Link
            href={`/dashboard/units/${unitId}/specialister/create`}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-sm hover:bg-green-200 transition">
            <HiPlus className="w-5 h-5" />
            Lägg till ny specialare
          </Link> */}
        </>
      )}
    </div>
  );
}

export default SpecialistActions;
