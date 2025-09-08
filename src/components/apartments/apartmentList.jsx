"use client";
import { deleteApartment, getApartments } from "@/backend/apartmentAPI";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiPlus,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { displayErrorMessage } from "@/helper/toastAPI";
import SearchApartment from "./searchApartment";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";

function ApartmentList({ apartments: initialApartments }) {
  const [apartments, setApartments] = useState(initialApartments);
  const { currentUser, loading } = useFetchCurrentUser();

  useEffect(() => {
    setApartments(initialApartments);
  }, [initialApartments]);

  const handleDelete = async (id) => {
    await deleteApartment(id);
    const updatedApartments = await getApartments();
    setApartments(updatedApartments);
    displayErrorMessage("Lägenhet har tagits bort");
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <h3 className="text-blue-600  text-2xl">Alla flyttstäd</h3>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start">
        {currentUser.role?.some(
          (r) =>
            r === "Avdelningschef" ||
            r === "Områdeschef" ||
            r === "Flyttstädansvarig"
        ) && (
          <Link
            className="text-green-800 flex items-center gap-3"
            href={"/dashboard/apartments/create"}>
            <HiPlus />
            <span>Skapa flyttstäd</span>
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:block mb-6">
        <SearchApartment />
      </div>

      {/* Ingen lägenheter */}
      {apartments.length === 0 && (
        <div className="flex flex-col items-center text-center text-blue-500 text-lg mt-10">
          <HiOutlineClipboardList className="w-12 h-12 mb-2" />
          <p>Det finns inga lägenheter att visa...</p>
        </div>
      )}

      {/* Lista med lägenheter */}
      <div
        className={`flex flex-col gap-6 ${
          apartments.length > 5 ? "overflow-y-auto max-h-[500px]" : ""
        }`}>
        {apartments.map((apartment) => (
          <div
            key={apartment._id}
            className="border border-b-2 p-5 bg-gray-50 rounded-md shadow-sm">
            <ul className="flex flex-col gap-2">
              <li className="border border-b-4 p-4 border-b-orange-400 bg-gray-200">
                <span className="font-bold">Lägenheten ligger på:</span>{" "}
                {apartment.apartmentLocation}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Tilldelad:</span>{" "}
                {apartment?.assignedUnit?.name}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Nycklarna finns på:</span>{" "}
                {apartment.keyLocation}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Beskrivning:</span>{" "}
                {apartment.description}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Prioritet:</span>{" "}
                {apartment.priority}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Start Datum:</span>{" "}
                {new Date(apartment.startDate).toLocaleDateString("sv-SE")}
              </li>
              <li className="border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                <span className="font-bold">Slut Datum:</span>{" "}
                {new Date(apartment.endDate).toLocaleDateString("sv-SE")}
              </li>

              {/* Status */}
              <li
                className={`border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ${
                  apartment.status === "Ej påbörjat"
                    ? "text-red-800"
                    : apartment.status === "Påbörjat"
                    ? "text-orange-500"
                    : "text-green-700"
                }`}>
                <span className="font-bold">Status:</span> {apartment.status}{" "}
                <span className="text-gray-800 text-sm">
                  | Senast ändrad:{" "}
                  {new Date(apartment.updatedAt).toLocaleString()}
                </span>
              </li>

              {/* Action buttons */}
              <div className="flex gap-3 mt-4 flex-wrap">
                {currentUser.role?.some(
                  (r) =>
                    r === "Avdelningschef" ||
                    r === "Områdeschef" ||
                    r === "Flyttstädansvarig"
                ) && (
                  <Link
                    href={`/dashboard/apartments/${apartment._id}/edit`}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
                    <HiOutlinePencilAlt className="w-5 h-5" />
                    Uppdatera
                  </Link>
                )}
                {currentUser.role?.some(
                  (r) => r === "Avdelningschef" || r === "Områdeschef"
                ) && (
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          "Är du säker på att du vill ta bort denna lägenhet?"
                        )
                      ) {
                        handleDelete(apartment._id);
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
                    <HiOutlineTrash className="w-5 h-5" />
                    Ta bort
                  </button>
                )}
              </div>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApartmentList;
