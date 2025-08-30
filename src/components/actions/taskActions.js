"use client";
import React from "react";
import { deleteTask } from "@/backend/taskApi";
import { displayErrorMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";

function TaskActions({ task }) {
  const router = useRouter();
  const { currentUser, loading } = useFetchCurrentUser();

  const deleteHandler = async (id) => {
    try {
      const deleted = await deleteTask(id);
      console.log(`Uppgift ${id} har tagits bort`);

      if (!deleted) {
        displayErrorMessage(`Kunde inte ta bort uppgift med ID ${id}`);
        return;
      }

      displayErrorMessage("Uppgiften har tagits bort");
      router.push(`/dashboard/tasks`);
    } catch (error) {
      console.error(
        `Fel vid borttagning av task med ID ${id}: ${error.message}`
      );
      displayErrorMessage(
        `Fel vid borttagning av task med ID ${id}: ${error.message}`
      );
      router.push(`/dashboard/tasks`);
    }
  };

  if (loading || !currentUser) {
    return <LoadingPage />;
  }

  return (
    <div className="flex items-center gap-4 mt-2">
      {task && currentUser && (
        <>
          {/* Uppdatera-knapp */}
          <Link
            href={`/dashboard/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition text-sm">
            <HiOutlinePencilAlt className="w-4 h-4" />
            Uppdatera
          </Link>

          {/* Ta bort-knapp */}
          {!currentUser.role?.includes("Enhetschef") && (
            <button
              onClick={() => {
                if (
                  confirm("Är du säker på att du vill ta bort denna uppgift?")
                ) {
                  deleteHandler(task._id);
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition text-sm">
              <HiOutlineTrash className="w-4 h-4" />
              Ta bort
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default TaskActions;
