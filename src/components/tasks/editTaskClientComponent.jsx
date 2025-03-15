"use client";
import { getUnits } from "@/backend/api";
import { getPlaces } from "@/backend/googlePlaceApi";
import { assignTaskToUnit, updateTask } from "@/backend/taskApi";
import React, { useEffect, useState } from "react";
import { Loading } from "../loading";
import { fetchPlaces } from "@/helper/fetchPlaces";
import { useFetchPlaces } from "@/customhook/useFetchPlaces";

function EditTaskClientComponent({ task }) {
  console.log("TASK IN EDIT TASK COMPONENT", task);
  // console.log("UNIT ID I EditTaskClientComponent",);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(false);

  //custom hook

  const [placeResults, loading, fetchPlaceData] = useFetchPlaces();

  // const [placeResults, setPlaceResults] = useState([]);
  // const [loading, setLoading] = useState(false);

  const statusOptions = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    location: "",
    completed: "",
    unit: "",
    taskId: "",
  });

  // se över när det finns tid
  const isFormValid = () => {
    return (
      (taskData.title.trim() !== "" &&
        taskData.description.trim() !== "" &&
        taskData.completed !== "" &&
        taskData.unit !== null) ||
      taskData.unit !== undefined
    );
  };

  const handlePlaceInputChange = (e) => {
    const { value } = e.target;
    setTaskData((prevTask) => ({
      ...prevTask,
      title: value,
    }));
    console.log("SÖKTA PLATS: ", value);
    fetchPlaceData(value);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTask) => ({ ...prevTask, [name]: value }));
  };
  const handleSubmit = async (e) => {
    console.log("taskData.taskId i handleSubmit :", taskData.taskId);
    console.log("taskId:", JSON.stringify(taskData.taskId));

    e.preventDefault();
    try {
      const updatedTask = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        location: taskData.location,
        unit: taskData.unit,
        taskId: taskData.taskId,
      };
      console.log("Sending to API:", {
        unit: taskData.unit,
        taskId: taskData.taskId,
        updatedTask,
      });

      console.log(
        "UPDATE STATUS FOR TASK",
        taskData.unit,
        taskData.taskId,
        updatedTask
      );

      await assignTaskToUnit(taskData.unit, taskData.taskId, updatedTask); //skicka unit:(unitId), taskId och uppdaterat objekt
    } catch (error) {
      console.error(
        `Det gick inte att uppdatera task med status och enhet ERROR: ${error.message}`
      );
    }
  };

  useEffect(() => {
    console.log("TASK IN EDIT TASK COMPONENT i useEffect", task);
    console.log("assignTaskToUnit", assignTaskToUnit);

    setTaskData({
      title: task.title || "",
      description: task.description || "",
      completed: task.completed,
      unit: task.unit,
      taskId: task.taskId,
    });
  }, [task]);

  //get Units
  console.log("Task Data", taskData);

  const fetchUnits = async () => {
    try {
      const data = await getUnits();
      if (!data) {
        return <div>Loading....</div>;
      }
      console.log("Units in EDIT TASK COMPONENT", data);
      setUnits(data);
    } catch (error) {
      console.error(
        `VId hämtning av data - blev det fel: ERROR: ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // if (loading) return <Loading />;

  return (
    <div className="flex flex-col">
      <h3 className="text-purple-600 text-2xl py-3 mb-5">
        Du uppdaterar {taskData.title} {taskData.taskId}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <input
            className="w-full bg-gray-100 border border-blue-200 focus:bg-yellow-200 p-1 rounded-xl"
            type="text"
            name="title"
            value={taskData.title}
            onChange={handlePlaceInputChange}
          />
        </div>
        <div className="mb-4 flex flex-col content-start ">
          <textarea
            className=" text-start w-full h-32 bg-gray-100 border border-blue-200 focus:bg-yellow-200 p-1 rounded-xl"
            type="text"
            name="description"
            value={taskData.description}
            onChange={changeHandler}></textarea>
        </div>
        <div className="mb-3 flex flex-row">
          <div className="w-1/2">
            <select
              className="w-full bg-gray-100 p-2 border border-b-gray-400 mb-4"
              name="completed"
              value={taskData.completed}
              onChange={changeHandler}>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="ml-3 w-1/2">
            <select
              className="w-full bg-gray-100 p-2 border border-b-gray-400 mb-4"
              name="unit"
              value={taskData.unit}
              onChange={changeHandler}>
              <option value="">Vilken enhet?</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* //visa place result */}
        {placeResults && placeResults.length > 0 && (
          <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border">
            {placeResults.map((place, index) => (
              <div
                key={index}
                className="border-b border-purple-600  hover:bg-gray-100 cursor-pointer p-2 my-2"
                onClick={() => {
                  setTaskData((prevTask) => ({
                    ...prevTask,
                    title: place.name,
                    location: place.formatted_address,
                  }));
                  setPlaceResults([]);
                }}>
                {place.name} {place.formatted_address}
              </div>
            ))}
          </div>
        )}
        <button
          disabled={!isFormValid()}
          className={`p-2 w-80 border rounded-2xl ${
            isFormValid()
              ? "bg-pink-400 hover:bg-pink-500 text-white "
              : "bg-gray-300 text-gray-500cursor-not-allowed"
          }`}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTaskClientComponent;
