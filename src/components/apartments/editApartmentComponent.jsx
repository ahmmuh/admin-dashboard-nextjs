"use client";
import { getApartmentByID, updateApartment } from "@/backend/apartmentAPI";
import React, { useEffect, useState } from "react";
import DatePickerComponent from "../datePicker";
import { useParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { displayErrorMessage } from "@/helper/toastAPI";

function EditApartmentComponent() {
  const router = useRouter();
  const priorityList = ["Normal", "Låg", "Hög"];
  const statusar = ["Ej påbörjat", "Påbörjat", "Färdigt"];
  const { apartmentId } = useParams();

  const [apartment, setApartment] = useState({
    apartmentLocation: "",
    keyLocation: "",
    description: "",
    priority: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const fetchApartmentById = async () => {
    try {
      const apartmentData = await getApartmentByID(apartmentId);
      setApartment(apartmentData);
    } catch (error) {
      // console.error("ERROR vid hämtning av APARTMENT OBJECT", error.message);
    }
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
    try {
      await updateApartment(apartmentId, updatedApartment);
      toast.success(
        `Lägenhet med address: ${updatedApartment.apartmentLocation} har uppdaterats`
      );
      router.push("/dashboard/apartments");
    } catch (error) {
      displayErrorMessage("Lägenhet kunde inte uppdateras");
      router.push("/dashboard/apartments");
    }
  };

  return (
    <div className="">
      <Toaster />
      <h3 className="text-blue-500  pt-2 px-5 text-2xl">Uppdatera lägenhet</h3>

      <div className="flex flex-col p-5">
        <form onSubmit={handleSubmit} className="mb-10">
          <div>
            <label
              htmlFor="apartmentLocation"
              className="block mb-2 font-semibold">
              Lägenheten ligger på
            </label>
            <input
              id="apartmentLocation"
              type="text"
              style={{ color: "#000" }}
              className="p-2 bg-gray-200 border border-b-gray-50 w-full
                         shadow shadow-blue-100 focus:bg-yellow-50 rounded"
              name="apartmentLocation"
              value={apartment.apartmentLocation}
              onChange={handleChange}
            />
          </div>

          <div>
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

          <div>
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

          <div>
            <label htmlFor="startDate" className="block mb-2 font-semibold">
              Planerat Start Datum
            </label>
            <DatePickerComponent
              name={apartment.startDate}
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

          <div>
            <label htmlFor="endDate" className="block mb-2 font-semibold">
              Planerat slut datum
            </label>
            <DatePickerComponent
              name={apartment.endDate}
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

          <div>
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

          <div>
            <label htmlFor="status" className="block mb-2 font-semibold">
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
            className="mt-4 p-2 w-1/3 bg-indigo-200 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-300 transition"
            type="submit">
            Spara
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditApartmentComponent;
