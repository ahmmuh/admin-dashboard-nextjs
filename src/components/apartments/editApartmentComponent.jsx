"use client";
import { getApartmentByID, updateApartment } from "@/backend/apartmentAPI";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "../datePicker";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function EditApartmentComponent() {
  const router = useRouter();
  const priorityList = ["Normal", "Låg", "Hög"];
  const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const { apartmentId } = useParams();
  console.log("Apartment ID: ", apartmentId);

  const [apartment, setApartment] = useState({});

  const fetchApartmentById = async () => {
    try {
      const apartmentData = await getApartmentByID(apartmentId);
      toast.success("Lägenheten har uppdaterats");
      console.log("Hämtad APARTMENT", apartmentData);
      setApartment(apartmentData);
    } catch (error) {
      console.error("ERROR vid hämtning av APARTMENT OBJECT", error.message);
    }
    console.log("Hela apartment", apartment);
  };

  useEffect(() => {
    fetchApartmentById();
  }, [apartmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment(() => ({
      ...apartment,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedApartment = {
      apartmentLocation: apartment.apartmentLocation,
      keyLocation: apartment.keyLocation,
      description: apartment.description,
      priority: apartment.priority,
      status: apartment.status,
      startDate: apartment.startDate,
      endDate: apartment.endDate,
    };
    console.log("Updated APARTMENT ", updatedApartment);
    await updateApartment(apartmentId, updatedApartment);
    toast.success(
      `Lägenhet med address: ${updatedApartment.apartmentLocation} har uppdaterats`
    );
    router.push("/apartments");
  };

  return (
    <div className="">
      <Toaster />
      <h3 className="text-purple-500 font-bold pt-2 px-5 text-2xl">
        Update lägenhet
      </h3>

      <div className="flex flex-col p-5 ">
        <form onSubmit={handleSubmit} className=" mb-10">
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
              onChange={(date) =>
                setApartment((prevData) => ({
                  ...prevData,
                  startDate: date.toISOString(),
                }))
              }
              selectedDate={
                apartment.startDate ? new Date(apartment.startDate) : new Date()
              }
            />
          </div>

          <div className="mb-6">
            <label htmlFor="endDate" className="block mb-2 font-semibold">
              Planerat slut datum
            </label>
            <DatePickerComponent
              onChange={(date) =>
                setApartment((prevData) => ({
                  ...prevData,
                  endDate: date.toISOString(),
                }))
              }
              selectedDate={
                apartment.endDate ? new Date(apartment.endDate) : new Date()
              }
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

          <div className="mb-6">
            <label htmlFor="priority" className="block mb-2 font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="p-2 bg-gray-200 border border-b-gray-50 w-full
              shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              value={apartment.status}
              onChange={handleChange}>
              <option value="" disabled hidden>
                Välj
              </option>
              {statusar.map((status, index) => (
                <option value={status} key={index}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-green-400 text-white p-2 w-1/5 border border-b-2
          border-b-slate-500 rounded hover:bg-green-500"
            type="submit">
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditApartmentComponent;
