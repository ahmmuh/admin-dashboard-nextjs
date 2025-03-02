"use client";
import React, { useEffect, useState } from "react";

function EditTaskComponent({ task }) {
  console.log("TASK IN EDIT TASK COMPONENT", task);

  const statusOptions = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTas) => ({ ...prevTas, [name]: value }));
  };
  const handleSubmit = (e) => {
    console.log("Submitted");
  };

  useEffect(() => {
    setTaskData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "Ej påbörjat",
    });
  }, [task]);
  return (
    <div className="flex flex-col">
      <h3 className="text-purple-600 text-2xl py-3 mb-5">Du uppdaterar {taskData.title}</h3>
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
        <div className="mb-3">
          <select
            className="w-full bg-gray-100 p-2 border border-b-gray-400"
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

        <button
          className="bg-green-500 text-white p-2 w-80 border border-blue-300
              rounded-2xl hover:bg-green-700">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditTaskComponent;
