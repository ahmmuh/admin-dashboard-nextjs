"use client";
import { addNewTask } from "@/backend/taskApi";
import React, { useState } from "react";

function CreateTaskClientComponent({ unitId }) {
  console.log("UNIT ID i CRETE TASK CLIENT COMPONENT", unitId);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //validate
  const isFormValid = () => {
    return task.title.trim() !== "" && task.description.trim() !== "";
  };

  function changeHandler(e) {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Skapat en ny uppgift");
    // console.log("New Task", task);

    try {
      const newTask = {
        title: task.title,
        description: task.description,
      };
      await addNewTask(unitId, newTask);
    } catch (error) {
      console.error(
        `Fel vid uppdatering av enhet med NY TASK ${error.message}`
      );
    }
  };
  return (
    <div className="p-5">
      <h4 className="text-3xl text-purple-500 mb-3">Lägg till ny task</h4>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            className="bg-gray-200 w-full p-2 rounded-2xl border focus:bg-yellow-100"
            type="text"
            name="title"
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <textarea
            rows={10}
            className="bg-gray-200 w-full p-2 rounded-2xl border focus:bg-yellow-100"
            type="text"
            name="description"
            onChange={changeHandler}></textarea>
        </div>
        <button
          disabled={!isFormValid()}
          className={`p-2 w-80 border rounded-2xl ${
            isFormValid()
              ? "bg-pink-400 hover:bg-pink-500 text-white "
              : "bg-gray-300 text-gray-500cursor-not-allowed"
          }`}>
          Lägg till
        </button>
      </form>
    </div>
  );
}

export default CreateTaskClientComponent;
