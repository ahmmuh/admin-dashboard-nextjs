"use client";
import React, { useEffect, useState } from "react";

const CreateWorkplaceComponent = () => {
  const [newWorkplace, setNewWorkPlace] = useState({
    name: "",
    location: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sparat arbetsplats:", newWorkplace);
  };

  useEffect(() => {
    console.log("State Uppdateras ", newWorkplace);
  }, [newWorkplace]);
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-pink-600 text-xl">Skapa en ny arbetsplats</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            name="name"
            type="text"
            value={newWorkplace.name}
            onChange={(e) => {
              setNewWorkPlace((prev) => ({ ...prev, name: e.target.value }));
              console.log("Name:", e.target.value); // Debug-logg
            }}
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
          />
        </div>

        <div className="mb-2">
          <input
            name="location"
            type="text"
            value={newWorkplace.location}
            onChange={(e) => {
              setNewWorkPlace((prev) => ({
                ...prev,
                location: e.target.value,
              }));
              console.log("Location:", e.target.value); // Debug-logg
            }}
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
          />
        </div>
        <button className="bg-indigo-200   border-indigo-300  hover:bg-indigo-300  text-center w-32 p-2 rounded border border-b-gray-700 shadow shadow-blue-300 transition text-white">
          Spara
        </button>
      </form>
    </div>
  );
};

export default CreateWorkplaceComponent;
