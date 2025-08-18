"use client";
import React from "react";
import { deleteChef } from "@/backend/api";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";

function ActionsHandler({ unitId, chef }) {
  const { currentUser, loading } = useFetchCurrentUser();
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

  console.log("currentUser:", currentUser);
  console.log("chef:", chef);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex gap-4 mt-6">
      <>
        <div className="flex gap-3 mt-4">
          {/* Uppdatera-knapp */}

          {(currentUser._id === chef._id ||
            currentUser.role?.trim() === "Områdeschef" ||
            currentUser.role?.trim() === "Avdelningschef") && (
            <Link
              href={`/dashboard/units/${unitId}/chefer/edit/?chefId=${chef._id}&name=${chef.name}&phone=${chef.phone}&email=${chef.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              <HiOutlinePencilAlt className="w-5 h-5" />
              Uppdatera
            </Link>
          )}

          {/* Ta bort-knapp */}
          {currentUser?.role.trim() !== "Enhetschef" && (
            <>
              <button
                onClick={() => {
                  if (
                    confirm("Är du säker på att du vill ta bort denna chef?")
                  ) {
                    deleteHandler(chef._id);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
                <HiOutlineTrash className="w-5 h-5" />
                Ta bort
              </button>

              <Link
                href={`/dashboard/units/${unitId}/chefer/create`}
                className="flex items-center gap-2 px-4  bg-green-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
                <HiPlus className="w-5" />
                Lägg till ny chef
              </Link>
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default ActionsHandler;
