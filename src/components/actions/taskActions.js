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
      const task = await deleteTask(id);
      console.log(`task ${id} has been deleted`);
      if (task) {
        return displayErrorMessage(
          `Fel vid borttagning av task med ID ${id} message: ${error.message}`
        );
      }
      displayErrorMessage("Task har tagits bort");
      router.push(`/dashboard/tasks`);
      return task;
    } catch (error) {
      console.log(
        `Fel vid borttagning av task med ID ${id} message: ${error.message}`
      );
      displayErrorMessage(
        `Fel vid borttagning av task med ID ${id} message: ${error.message}`
      );
      router.push(`/tasks`);
    }
  };

  if (loading || !currentUser) {
    return <LoadingPage />;
  }
  return (
    // <div className="flex gap-4 mt-6">
    //   {task && (
    //     <>
    //       <div className="flex gap-3 mt-4">
    //         {/* Uppdatera-knapp */}
    //         <Link
    //           href={`/dashboard/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
    //           className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
    //           <HiOutlinePencilAlt className="w-5 h-5" />
    //           Uppdatera
    //         </Link>

    //         {/* Ta bort-knapp */}

    //         {currentUser.role?.join(", ") !== "Enhetschef" && (
    //           <button
    //             onClick={() => {
    //               if (
    //                 confirm("Är du säker på att du vill ta bort denna uppgift?")
    //               ) {
    //                 deleteHandler(task._id);
    //               }
    //             }}
    //             className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
    //             <HiOutlineTrash className="w-5 h-5" />
    //             Ta bort
    //           </button>
    //         )}
    //       </div>
    //     </>
    //   )}
    // </div>
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
