"use client";
import { getPlaces } from "@/backend/googlePlaceApi";
import { addNewTask } from "@/backend/taskApi";
import { useFetchPlaces } from "@/customhook/useFetchPlaces";
import { faAd, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function CreateTaskClientComponent({ unitId }) {
  console.log("UNIT ID i CREATE TASK CLIENT COMPONENT", unitId);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  // const [placeResults, setPlaceResults] = useState([]);

  //custom hook

  const [placeResults, loading, fetchPlaceData] = useFetchPlaces();

  // const [loading, setLoading] = useState(false);

  // const fetchPlace = async (query) => {
  //   try {
  //     if (!query) {
  //       return;
  //     }
  //     setLoading(true);
  //     const response = await getPlaces(query);
  //     if (!response || !response.results) {
  //       console.warn("Inga platser hittades eller fel i response ", response);
  //       setPlaceResults([]);
  //       return;
  //     }
  //     setPlaceResults(response.results);
  //   } catch (error) {
  //     console.error("Fel vid hämtning av platser", error);
  //     setPlaceResults([]); //Rensa resultat vid fel
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      };
      await addNewTask(unitId, newTask);
      console.log("NY TASK on the WAY", newTask);
      setTask({ title: "", description: "" });
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
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  );
}

export default CreateTaskClientComponent;
