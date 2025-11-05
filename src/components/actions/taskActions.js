"use client";

import React, { useState } from "react";
import { deleteTask } from "@/backend/taskApi";
import { displayErrorMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import Link from "next/link";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";
import CustomAlert from "@/helper/customAlert";

function TaskActions({ task, fetchTasks }) {
  const router = useRouter();
  const { currentUser, loading } = useFetchCurrentUser();
  const [selectedTask, setSelectedTask] = useState(null); // 🔹 state för CustomAlert

  const deleteHandler = async (id) => {
    try {
      const deleted = await deleteTask(id);

      if (!deleted) {
        displayErrorMessage(`Kunde inte ta bort uppgift med ID ${id}`);
        return;
      }

      displayErrorMessage("Uppgiften har tagits bort");
      await fetchTasks();
    } catch (error) {
      displayErrorMessage(
        `Fel vid borttagning av task med ID ${id}: ${error.message}`
      );
      router.push(`/dashboard/tasks`);
    }
  };

  if (loading || !currentUser) {
    return <LoadingPage />;
  }

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  // const canEdit = task?.unit?._id.toString() === currentUser?.unit?.toString();
  const isEnhetschef =
    currentUser?.role?.includes("Enhetschef") &&
    task?.unit?._id?.toString() === currentUser?.unit?._id?.toString();

  return (
    <div className="flex items-center gap-4 mt-2">
      {task && (isManager || isEnhetschef) && (
        <>
          {/* Uppdatera-knapp */}
          <Link
            href={`/dashboard/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition text-sm">
            <HiOutlinePencilAlt className="w-4 h-4" />
            Uppdatera
          </Link>

          {/* Ta bort-knapp */}
          <button
            onClick={() => setSelectedTask(task)} // 🔹 visa CustomAlert
            className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition text-sm">
            <HiOutlineTrash className="w-4 h-4" />
            Ta bort
          </button>
        </>
      )}

      {/* 🔹 Visa CustomAlert */}
      {selectedTask && (
        <CustomAlert
          message={`Vill du ta bort uppgiften "${selectedTask.title}"?`}
          onConfirm={async () => {
            await deleteHandler(selectedTask._id);
            setSelectedTask(null); // stäng alerten
          }}
          onCancel={() => setSelectedTask(null)} // stäng alerten
        />
      )}
    </div>
  );
}

export default TaskActions;
