"use client";
import React, { useState } from "react";

export const EditWorkPlaceClientComponent = ({ unitId, workPlace }) => {
  console.log("unitID & workPlace in WorkPlaceClientComponent", workPlace);
  const [updatedWorkPlace, setUpdatedWorkPlace] = useState({
    name: "",
    location: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-pink-600 text-xl">
        Du uppdaterar - {workPlace.name}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={workPlace.name}
            onChange={(e) => setUpdatedWorkPlace(e.target.value)}
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
          />
        </div>

        <div className="mb-2">
          <input
            name="location"
            type="text"
            value={workPlace.location}
            onChange={(e) => setUpdatedWorkPlace(e.target.value)}
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 text-center w-32 p-2 rounded border border-b-gray-700 shadow shadow-blue-300 transition text-white">
          Update
        </button>
      </form>
    </div>
  );
};
