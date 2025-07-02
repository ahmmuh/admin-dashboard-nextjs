"use client";
import { deleteApartment, getApartments } from "@/backend/apartmentAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SearchInput from "../searhInput";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { displayErrorMessage } from "@/helper/toastAPI";

function ApartmentList({ apartments: initialApartments }) {
  const [apartments, setApartments] = useState(initialApartments);
  const router = useRouter();
  console.log("Apartment i apartment list", apartments);

  useEffect(() => {
    setApartments(initialApartments);
  }, [initialApartments]);

  const handleDelete = async (id) => {
    console.log("Deleted Apartment ID", id);
    const lgh = await deleteApartment(id);
    const updatedApartments = await getApartments();
    setApartments(updatedApartments);
    displayErrorMessage("lägenhet: har tagits bort");
  };
  return (
    <div className=" p-6">
      <h4 className="text-2xl mb-10 font-bold text-purple-500">
        Alla lägenheter
      </h4>

      <div className=" flex justify-start flex-col ">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Ny lägenhet */}
          <Link
            href={`/dashboard/apartments/create`}
            className="bg-indigo-100 text-indigo-800 font-medium px-5 py-3 w-full sm:w-96 rounded-xl border border-indigo-200 hover:bg-indigo-200 transition">
            Ny lägenhet
          </Link>

          {/* Pågående flyttstäd */}
          <h5 className="bg-blue-100 text-blue-800 font-medium px-5 py-3 w-full sm:w-96 rounded-xl border border-blue-200">
            Pågående flyttstäd ({apartments?.length})
          </h5>
        </div>

        {apartments &&
          apartments.map((apartment) => (
            <div className="border border-b-2  p-5" key={apartment._id}>
              {/* <SearchInput
                type="text"
                onSearch={() => console.log("Söker key logs")}
                delay={400}
                placeholder="Sök...."
              /> */}
              <ul className="flex justify-start p-6  flex-col">
                <li className="border border-b-4 p-4 border-b-orange-400 bg-gray-200">
                  <span className="font-bold"> Lägenheten ligger på :</span>{" "}
                  {apartment.apartmentLocation}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ">
                  <span className="font-bold"> Tilldelad :</span>{" "}
                  {apartment.assignedUnit.name}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ">
                  <span className="font-bold"> Nycklarna finns på :</span>{" "}
                  {apartment.keyLocation}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200  ">
                  <span className="font-bold"> Beskrivning:</span>{" "}
                  {apartment.description}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ">
                  <span className="font-bold"> Prioriteten:</span>{" "}
                  {apartment.priority}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ">
                  <span className=""> Start Datum:</span>{" "}
                  {new Date(apartment.startDate).toLocaleDateString()}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 ">
                  <span className=""> Slut Datum:</span>{" "}
                  {new Date(apartment.endDate).toLocaleDateString()}
                </li>
                {apartment.status === "Ej påbörjat" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-red-800 hover:bg-gray-200 ">
                    <span className="font-bold"> Status:</span>{" "}
                    {apartment.status}
                  </li>
                )}

                {apartment.status === "Påbörjat" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-orange-500 hover:bg-gray-200 ">
                    <span className="font-bold"> Status:</span>{" "}
                    {apartment.status}{" "}
                    <span className="text-gray-800">
                      | Uppdaterad:{" "}
                      {new Date(apartment.updatedAt).toLocaleString()}
                    </span>
                  </li>
                )}

                {apartment.status === "Färdigt" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-green-700 hover:bg-gray-200 ">
                    <span className="font-bold "> Status:</span>{" "}
                    {apartment.status}
                  </li>
                )}

                <div className="flex gap-3 mt-4">
                  {/* Uppdatera-knapp */}
                  <Link
                    href={`/dashboard/apartments/${apartment._id}/edit`}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
                    <HiOutlinePencilAlt className="w-5 h-5" />
                    Uppdatera
                  </Link>

                  {/* Ta bort-knapp */}
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
                </div>

                {/* <div className="flex  justify-between items-center text-center my-5 w-1/2">
                  <Link
                    href={`/dashboard/apartments/${apartment._id}/edit`}
                    className="bg-purple-400 text-white p-2 w-full border border-b-2
          border-b-slate-500 rounded hover:bg-purple-500">
                    {" "}
                    Uppdatera
                  </Link>
                  <button
                    type="submit"
                    onClick={() => handleDelete(apartment._id)}
                    className="bg-red-300 text-white p-2 w-full border border-b-2
          border-b-slate-500 rounded hover:bg-red-400">
                    Ta bort
                  </button>
                </div> */}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ApartmentList;

// apartmentLocation
// :
// "Danmarksgatan 26"
// assignedAt
// :
// null
// assignedUnit
// :
// "6739998297a4cb689a4a83b2"
// completedAt
// :
// null
// createdAt
// :
// "2025-04-20T09:35:23.489Z"
// description
// :
// "Mycket skitlägenhet"
// endDate
// :
// null
// keyLocation
// :
// "Sagergatan 17"
// priority
// :
// "Hög"
// startDate
// :
// "2025-04-20T09:35:23.486Z"
// status
// :
// "Ej påbörjat"
// updatedAt
// :
// "2025-04-20T09:35:23.489Z"
