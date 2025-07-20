"use client";
import { useFetchPlaces } from "@/customhook/useFetchPlaces";
import { assignTaskToUnit, updateTask } from "@/backend/taskApi";
import React, { useEffect, useState } from "react";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import LoadingPage from "@/app/loading";

function EditTaskClientComponent({ task }) {
  // console.log("TASK ID", task.taskId);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const statusOptions = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    // location: "",
    status: "",
    taskId: "",
  });

  const { placeResults, fetchPlaceData } = useFetchPlaces();

  const isFormValid = () => {
    return (
      taskData.title.trim() !== "" &&
      taskData.description.trim() !== "" &&
      taskData.status !== ""
    );
  };

  const handlePlaceInputChange = (e) => {
    const { value } = e.target;
    setTaskData((prevTask) => ({
      ...prevTask,
      title: value,
    }));
    fetchPlaceData(value);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        // location: taskData.location,
        taskId: taskData._id,
      };

      await updateTask(taskData.taskId, updatedTask);
      displaySuccessMessage("Task har uppdaterats");
      router.push(`/dashboard/tasks`);
    } catch (error) {
      console.error(
        `Fel vid uppdatering av enhet med NY TASK ${error.message}`
      );
      displayErrorMessage(
        `Fel vid uppdatering av enhet med NY TASK ${error.message}`
      );
      router.push(`/dashboard/tasks`);
    }
  };

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Ej påbörjat", // fallback om undefined
        // location: task.location || "",
        taskId: task.taskId || "", // rätt namn från mongoose
      });

      const timeout = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [task]);

  if (loading) return <LoadingPage message="Laddar uppdrag..." />;

  return (
    <div className="flex flex-col">
      <h3 className="text-purple-600 text-2xl py-3 mb-5">
        Du uppdaterar ett uppdrag
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="w-full bg-gray-100 border border-blue-200 focus:bg-yellow-200 p-1 rounded-xl"
            type="text"
            name="title"
            value={taskData.title}
            onChange={handlePlaceInputChange}
          />
        </div>

        <div className="mb-4 flex flex-col content-start">
          <textarea
            className="w-full h-32 bg-gray-100 border border-blue-200 focus:bg-yellow-200 p-1 rounded-xl"
            name="description"
            value={taskData.description}
            onChange={changeHandler}
          />
        </div>

        <div className="mb-3">
          <select
            className="w-full bg-gray-100 p-2 border border-b-gray-400 mb-4"
            name="status"
            value={taskData.status}
            onChange={changeHandler}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        {/* 
        {placeResults && placeResults.length > 0 && (
          <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border">
            {placeResults.map((place, index) => (
              <div
                key={index}
                className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2 my-2"
                onClick={() => {
                  setTaskData((prevTask) => ({
                    ...prevTask,
                    title: place.name,
                    location: place.formatted_address,
                  }));
                  fetchPlaceData("");
                }}>
                {place.name} {place.formatted_address}
              </div>
            ))}
          </div>
        )} */}

        <button
          disabled={!isFormValid()}
          className={`p-2 w-80 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition`}>
          Uppdatera
        </button>
      </form>
    </div>
  );
}

export default EditTaskClientComponent;
