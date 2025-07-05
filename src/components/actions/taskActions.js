"use client";
import React from "react";
import { deleteTask } from "@/backend/taskApi";
import { displayErrorMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
function TaskActions({ task }) {
  const router = useRouter();
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
      P;
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
  return (
    <div className="flex gap-4 mt-6">
      {task && (
        <>
          <div className="flex gap-3 mt-4">
            {/* Uppdatera-knapp */}
            <Link
              href={`/dashboard/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
              <HiOutlinePencilAlt className="w-5 h-5" />
              Uppdatera
            </Link>

            {/* Ta bort-knapp */}
            <button
              onClick={() => {
                if (
                  confirm("Är du säker på att du vill ta bort denna uppgift?")
                ) {
                  deleteHandler(task._id);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
              <HiOutlineTrash className="w-5 h-5" />
              Ta bort
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskActions;
