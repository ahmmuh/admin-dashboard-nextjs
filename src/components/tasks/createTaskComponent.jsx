"use client";

import { addTask } from "@/backend/taskApi";
import { useFetchPlaces } from "@/customhook/useFetchPlaces";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateTaskClientComponent() {
  const router = useRouter();

  const [task, setTask] = useState({
    title: "",
    location: "",
    coordinates: null,
    description: "",
  });

  const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

  // Validate form
  const isFormValid = () =>
    task.title.trim() !== "" && task.description.trim() !== "";

  // Hantera input för plats (autocomplete)
  const handlePlaceInputChange = (e) => {
    const { value } = e.target;
    setTask((prev) => ({ ...prev, title: value }));
    if (value.length > 1) fetchPlaceData(value); // sök när minst 2 tecken
  };

  // Hantera textarea
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Submit task
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      displayErrorMessage("Fyll i titel och beskrivning");
      return;
    }

    try {
      const newTask = {
        title: task.title,
        description: task.description,
        location: task.location,
        coordinates: task.coordinates,
      };

      await addTask(newTask);
      console.log("NY TASK", newTask);

      displaySuccessMessage("Ny task har lagts till!");
      setTask({ title: "", location: "", coordinates: null, description: "" });
      router.push("/dashboard/tasks");
    } catch (error) {
      console.error(`Fel vid skapande av task: ${error.message}`);
      displayErrorMessage(`Fel vid skapande av task: ${error.message}`);
    }
  };

  return (
    <div className="p-2">
      <h4 className="text-2xl text-purple-500 mb-3">Lägg till nytt uppdrag</h4>

      <form onSubmit={submitHandler}>
        {/* Platsinput */}
        <div className="mb-3 relative">
          <input
            className="bg-white w-full p-2 rounded-2xl border"
            type="text"
            name="title"
            placeholder="Ange plats, t.ex. Katedralskolan"
            value={task.title}
            onChange={handlePlaceInputChange}
            autoComplete="off"
          />
          {loading && <div>Vi hämtar platser åt dig...</div>}

          {/* Visa autocomplete-resultat */}
          {placeResults.length > 0 && (
            <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border absolute z-10 w-full">
              {placeResults.map((place, index) => (
                <div
                  key={index}
                  className="border-b border-purple-600 hover:bg-gray-100 cursor-pointer p-2"
                  onClick={() => {
                    setTask((prev) => ({
                      ...prev,
                      title: place.name,
                      location: place.adress,
                      coordinates: place.coordinates,
                    }));
                    fetchPlaceData(""); // rensa resultat
                  }}>
                  {place.name} ({place.adress})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beskrivning */}
        <div className="mb-3">
          <textarea
            rows={10}
            className="bg-white w-full p-2 rounded-2xl border"
            placeholder="Beskriv uppdraget, t.ex. Vi har personalbrist på Katedralskolan och behöver hjälp med två våningar"
            name="description"
            onChange={changeHandler}
            value={task.description}></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer p-2 w-80 border rounded-2xl bg-green-200 text-black hover:bg-green-300 hover:text-white">
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateTaskClientComponent;
