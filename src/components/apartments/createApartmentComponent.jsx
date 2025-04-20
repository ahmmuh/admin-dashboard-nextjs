"use client";
import React, { useState } from "react";

function CreateApartmentComponent({ units }) {
  const priorityList = ["Låg", "Normal", "Hög"];
  //   const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Ny apartment
  console.log("ENHETER", units);
  const [apartment, setApartment] = useState({
    apartmentLocation: "",
    keyLocation: "",
    description: "",
    priority: "",
    assignedUnit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment(() => ({
      ...apartment,
      [name]: value,
    }));
    console.log("Ny lägenhet", apartment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div className="">
      <h3 className="text-purple-500 font-bold p-2 text-2xl">
        Lägg till ny lägenhet
      </h3>

      <div className="flex flex-col pt-6 pr-20">
        <form className="" onSubmit={handleSubmit}>
          <div className="mb-5 ">
            <input
              type="text"
              style={{ color: "#000" }}
              className="text-red-500 p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              name="apartmentLocation"
              value={apartment.apartmentLocation}
              onChange={handleChange}
              placeholder="Var ligger lägenheten?"
            />
          </div>
          <div className="mb-5">
            <input
              className="p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              name="keyLocation"
              value={apartment.keyLocation}
              onChange={handleChange}
              placeholder="Var kan man hämta nyckel?"
            />
          </div>
          <div className="mb-5">
            <textarea
              value={apartment.description}
              onChange={handleChange}
              className="p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              placeholder=" Beskriv lite om jobbet"></textarea>
          </div>

          <div className="mb-5">
            <h4>Vilken enhet ska få den?</h4>
            <select
              name="assignedUnit"
              className="p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              onChange={handleChange}>
              {units.map((unit) => (
                <option selected={apartment.assignedUnit} value={unit.name}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <h4>Prioritering</h4>
            <select
              name="priority"
              className="p-1 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              onChange={handleChange}>
              {priorityList.map((p) => (
                <option selected={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-500 text-white p-2 w-1/5 border border-b-2
          border-b-slate-500 rounded hover:bg-blue-600 ">
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateApartmentComponent;
