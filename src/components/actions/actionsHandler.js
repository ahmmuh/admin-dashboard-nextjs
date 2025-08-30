"use client";
import React from "react";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { deleteUser } from "@/backend/userAPI";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";

function ActionsHandler({ unitId, chef, onDelete }) {
  const { currentUser, loading: userLoading } = useFetchCurrentUser();

  const deleteHandler = async (userId) => {
    if (!confirm("Är du säker på att du vill ta bort denna användare?")) return;
    try {
      await deleteUser(userId);
      // Anropa callback i parent för att ta bort användaren från state
      onDelete(userId);
      console.log(`Användare ${userId} har tagits bort`);
    } catch (error) {
      console.error(
        `Fel vid borttagning av användare ${userId}:`,
        error.message
      );
    }
  };

  if (userLoading) return null; // Ladda ej actions innan currentUser hämtats

  return (
    <div className="flex gap-4 mt-6">
      {(currentUser._id === chef._id ||
        currentUser.role?.includes("Områdeschef") ||
        currentUser.role?.includes("Avdelningschef")) && (
        <Link
          href={`/dashboard/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
          <HiOutlinePencilAlt className="w-5 h-5" />
          Uppdatera
        </Link>
      )}

      {!currentUser?.role?.includes("Enhetschef") && (
        <>
          <button
            onClick={() => deleteHandler(chef._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
            <HiOutlineTrash className="w-5 h-5" />
            Ta bort
          </button>

          {/* <Link
            href={`/dashboard/units/${unitId}/chefer/create`}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 border border-green-300 rounded-md shadow-sm hover:bg-green-200 transition">
            <HiPlus className="w-5 h-5" />
            Lägg till ny chef
          </Link> */}
        </>
      )}
    </div>
  );
}

export default ActionsHandler;
