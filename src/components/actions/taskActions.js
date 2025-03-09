"use client";
import React from "react";
import CustomLink from "../link";
import { deleteTask } from "@/backend/taskApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
            className="bg-blue-300 text-white w-32 text-center p-2 rounded-xl hover:bg-blue-400 transition duration-200"
            url={`/units/${unitId}/tasks/edit/?taskId=${task._id}&title=${task.title}&description=${task.description}&status=${task.completed}`}
            title={<FontAwesomeIcon icon={faEdit} />}
          />
          <button
            onClick={() => deleteHandler(task._id)}
            className="bg-red-300 text-white text-center w-32 p-2 rounded-xl  hover:bg-red-400 transition duration-200">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
}

export default TaskActions;
