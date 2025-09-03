"use client";
import { createApartment } from "@/backend/apartmentAPI";
import React, { useState } from "react";
import DatePickerComponent from "../datePicker";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateApartmentComponent() {
  const router = useRouter();
  const priorityList = ["Normal", "Låg", "Hög"];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [apartment, setApartment] = useState({
    apartmentLocation: "",
    keyLocation: "",
    description: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApartment = {
      apartmentLocation: apartment.apartmentLocation,
      keyLocation: apartment.keyLocation,
      description: apartment.description,
      priority: apartment.priority,
      startDate,
      endDate,
    };
    console.log("NEW APARTMENT ", newApartment);
    await createApartment(newApartment);
    toast.success("Ny lägenhet har publicerats");
    router.push("/dashboard/apartments");
    setApartment({
      apartmentLocation: "",
      keyLocation: "",
      description: "",
      priority: "",
    });
  };

  return (
    <div className="mb-10">
      <Toaster />
      <h3 className="text-blue-600 font-bold text-2xl">Skapa ny flyttstäd</h3>

      <div className="flex flex-col mt-6 pr-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Lägenhetsadress */}
          <div>
            <label
              htmlFor="apartmentLocation"
              className="block mb-1 font-medium text-gray-700">
              Adress till lägenheten
            </label>
            <input
              id="apartmentLocation"
              type="text"
              className="p-2 w-full rounded-md border border-gray-300 bg-gray-100 text-gray-900 
                         shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="apartmentLocation"
              value={apartment.apartmentLocation}
              onChange={handleChange}
            />
          </div>

          {/* Nyckel */}
          <div>
            <label
              htmlFor="keyLocation"
              className="block mb-1 font-medium text-gray-700">
              Plats för nyckeln
            </label>
            <input
              id="keyLocation"
              type="text"
              className="p-2 w-full rounded-md border border-gray-300 bg-gray-100 text-gray-900 
                         shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="keyLocation"
              value={apartment.keyLocation}
              onChange={handleChange}
            />
          </div>

          {/* Beskrivning */}
          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-medium text-gray-700">
              Beskrivning av jobbet
            </label>
            <textarea
              id="description"
              className="p-2 w-full rounded-md border border-gray-300 bg-gray-100 text-gray-900 
                         shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              name="description"
              rows={4}
              value={apartment.description}
              onChange={handleChange}
            />
          </div>

          {/* Startdatum */}
          <div>
            <label
              htmlFor="startDate"
              className="block mb-1 font-medium text-gray-700">
              Startdatum
            </label>
            <DatePickerComponent
              onChange={(date) => setStartDate(date)}
              selectedDate={startDate}
            />
          </div>

          {/* Slutdatum */}
          <div>
            <label
              htmlFor="endDate"
              className="block mb-1 font-medium text-gray-700">
              Slutdatum
            </label>
            <DatePickerComponent
              onChange={(date) => setEndDate(date)}
              selectedDate={endDate}
            />
          </div>

          {/* Prioritet */}
          <div>
            <label
              htmlFor="priority"
              className="block mb-1 font-medium text-gray-700">
              Prioritet
            </label>
            <select
              id="priority"
              name="priority"
              className="p-2 w-full rounded-md border border-gray-300 bg-gray-100 text-gray-900 
                         shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={apartment.priority}
              onChange={handleChange}>
              <option value="" disabled hidden>
                Välj prioritet
              </option>
              {priorityList.map((p, index) => (
                <option value={p} key={index}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Spara-knapp */}

          <button
            className="p-2 w-1/3 bg-indigo-100 text-indigo-800 font-medium 
             border border-indigo-200 rounded-md shadow-sm 
             hover:bg-indigo-200 transition"
            type="submit">
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateApartmentComponent;
