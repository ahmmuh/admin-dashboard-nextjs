"use client";
import React from "react";
import CustomLink from "../link";
import { deleteTask } from "@/backend/taskApi";

function TaskActions({ unitId, task }) {
  const deleteHandler = async (id) => {
    try {
      const task = await deleteTask(unitId, id);
      console.log(`task ${id} has been deleted`);
      return task;
    } catch (error) {
      console.log(
        `Fel vid borttagning av task med ID ${id} message: ${error.message}`
      );
    }
  };
  return (
    <div className="flex gap-4 mt-6">
      {task && (
        <>
          <CustomLink
            className="bg-blue-400 text-white w-32 text-center p-2 rounded-xl shadow-lg shadow-blue-500 hover:bg-blue-600 transition duration-200"
            url={`/units/${unitId}/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
            title={"Update Task"}
          />
          <button
            onClick={() => deleteHandler(task._id)}
            className="bg-red-400 text-white text-center w-32 p-2 rounded-xl shadow-lg shadow-red-300 hover:bg-red-600 transition duration-200">
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TaskActions;
