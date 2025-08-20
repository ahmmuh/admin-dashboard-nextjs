"use client";
import { getPlaces } from "@/backend/googlePlaceApi";
import { addNewTask } from "@/backend/taskApi";
import { useFetchPlaces } from "@/customhook/useFetchPlaces";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { faAd, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateTaskClientComponent() {
  const router = useRouter();
  // console.log("UNIT ID i CREATE TASK CLIENT COMPONENT", unitId);
  const [task, setTask] = useState({
    title: "",
    location: "",
    description: "",
  });

  // const [placeResults, setPlaceResults] = useState([]);

  //custom hook

  const { placeResults, loading, fetchPlaceData } = useFetchPlaces();

  //validate
  const isFormValid = () => {
    return task.title.trim() !== "" && task.description.trim() !== "";
  };

  const handlePlaceInputChange = (e) => {
    const { value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      title: value,
    }));
    console.log("SÖKTA PLATS: ", value);
    fetchPlaceData(value);
  };

  function changeHandler(e) {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newTask = {
        title: task.title,
        description: task.description,
        location: task.location,
      };
      // await addNewTask(newTask);
      console.log("NY TASK on the WAY", newTask);
      setTask({ title: "", description: "" });
      displaySuccessMessage("Ny task har lagts");
      router.push(`/tasks`);
    } catch (error) {
      console.error(
        `Fel vid uppdatering av enhet med NY TASK ${error.message}`
      );
      displayErrorMessage(
        `Fel vid uppdatering av enhet med NY TASK ${error.message}`
      );
      router.push(`/tasks`);
    }
  };
  return (
    <div className="p-5">
      <h4 className="text-3xl text-purple-500 mb-3">Lägg till nytt uppdrag</h4>

      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            className="bg-gray-200 w-full p-2 rounded-2xl border focus:bg-yellow-100"
            type="text"
            name="title"
            value={task.title}
            onChange={handlePlaceInputChange}
          />

          {loading && <div>Vi hämtar platser åt dej</div>}
        </div>
        <div className="mb-3">
          <textarea
            rows={10}
            className="bg-gray-200 w-full p-2 rounded-2xl border focus:bg-yellow-100"
            type="text"
            name="description"
            onChange={changeHandler}
            value={task.description}></textarea>
        </div>
        {/* //visa place result */}
        {placeResults && placeResults.length > 0 && (
          <div className="bg-white p-2 rounded-2xl my-2 max-h-60 overflow-y-scroll border">
            {placeResults.map((place, index) => (
              <div
                key={index}
                className="border-b border-purple-600  hover:bg-gray-100 cursor-pointer p-2 my-2"
                onClick={() => {
                  setTask((prevTask) => ({
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
        )}
        <button
          className={` cursor-pointer p-2 w-80 border rounded-2xl bg-green-200 text-black hover:bg-green-300 hover:text-white `}>
          Spara
        </button>
      </form>
    </div>
  );
}

export default CreateTaskClientComponent;
