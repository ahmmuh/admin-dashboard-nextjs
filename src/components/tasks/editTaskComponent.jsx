"use client";
import { getUnits, updateTask } from "@/backend/api";
import React, { useEffect, useState } from "react";

function EditTaskComponent({ task }) {
  // console.log("TASK IN EDIT TASK COMPONENT", task);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(false);

  const statusOptions = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: "",
    unitId: "",
    taskId: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTas) => ({ ...prevTas, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedTask = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        unitId: taskData.unitId,
        taskId: taskData.taskId,
      };
      console.log("Updated Task", updatedTask);
      await updateTask(taskData.unitId, taskData.taskId, updatedTask); //skicka unitId, taskId och uppdaterat objekt
    } catch (error) {
      console.error(
        `Det gick inte att uppdatera task med status och enhet ERROR: ${error.message}`
      );
    }
  };

  useEffect(() => {
    setTaskData({
      title: task.title || "",
      description: task.description || "",
      completed: task.completed || "Ej påbörjat",
      unitId: task.unit,
      taskId: task._id,
    });
  }, [task]);

  //get Units

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

  return (
    <div className="flex flex-col">
      <h3 className="text-purple-600 text-2xl py-3 mb-5">
        Du uppdaterar {taskData.title}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 ">
          <input
            className="w-full bg-gray-100 border border-blue-200 focus:bg-yellow-200 p-1 rounded-xl"
            type="text"
            name="title"
            value={taskData.title}
            onChange={changeHandler}
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
          <div className="ml-3 w-1/2">
            <select
              className="w-full bg-gray-100 p-2 border border-b-gray-400 mb-4"
              name="unitId"
              value={taskData.unitId}
              onChange={changeHandler}>
              <option value="">Vilken enhet?</option>
              {units.map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.name} {unit._id}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className=" bg-pink-400 text-white p-2 w-full border border-blue-300
              rounded-2xl hover:bg-pink-500">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTaskComponent;
