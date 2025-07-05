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
    setApartment(() => ({
      ...apartment,
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
      startDate: startDate,
      endDate: endDate,
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
      <h3 className="text-purple-500 font-bold  text-2xl">
        Lägg till ny lägenhet
      </h3>

      <div className="flex flex-col mt-6 pr-20">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="apartmentLocation"
              className="block mb-2 font-semibold">
              Lägenheten ligger på
            </label>
            <input
              id="apartmentLocation"
              type="text"
              style={{ color: "#000" }}
              className="text-red-500 p-2 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              name="apartmentLocation"
              value={apartment.apartmentLocation}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="keyLocation" className="block mb-2 font-semibold">
              Nyckeln finns på
            </label>
            <input
              id="keyLocation"
              className="p-2 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              type="text"
              name="keyLocation"
              value={apartment.keyLocation}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 font-semibold">
              Beskriv lite om jobbet
            </label>
            <textarea
              id="description"
              className="p-2 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              name="description"
              value={apartment.description}
              onChange={handleChange}></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="startDate" className="block mb-2 font-semibold">
              Planerat Start Datum
            </label>
            <DatePickerComponent
              onChange={(date) => setStartDate(date)}
              selectedDate={startDate}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="endDate" className="block mb-2 font-semibold">
              Planerat slut datum
            </label>
            <DatePickerComponent
              onChange={(date) => setEndDate(date)}
              selectedDate={endDate}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="priority" className="block mb-2 font-semibold">
              Prioritering
            </label>
            <select
              id="priority"
              name="priority"
              className="p-2 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              value={apartment.priority}
              onChange={handleChange}>
              <option value="" disabled hidden>
                Välj
              </option>
              {priorityList.map((p, index) => (
                <option value={p} key={index}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 text-white p-2 w-1/5 border border-b-2
          border-b-slate-500 rounded hover:bg-blue-600"
            type="submit">
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateApartmentComponent;
