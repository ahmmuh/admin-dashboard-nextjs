"use client";
import { deleteApartment, getApartments } from "@/backend/apartmentAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ApartmentList({ apartments: initialApartments }) {
  const [apartments, setApartments] = useState(initialApartments);
  const router = useRouter();
  console.log("Apartment i apartment list", apartments);

  useEffect(() => {
    setApartments(initialApartments);
  }, [initialApartments]);

  const handleDelete = async (id) => {
    console.log("Deleted Apartment ID", id);
    await deleteApartment(id);
    const updatedApartments = await getApartments();
    setApartments(updatedApartments);
  };
  return (
    <div className=" p-6">
      <h4 className="text-2xl mb-10 font-bold text-purple-500">
        Alla lägenheter
      </h4>
      <div className=" flex justify-start flex-col ">
        <div className="flex ">
          <Link
            href={`/apartments/create`}
            className="mb-5 bg-green-100 p-3  w-96 rounded-xl hover:bg-green-200 ">
            Ny lägenhet
          </Link>
          <h5 className="ml-10 mb-5 bg-green-100 p-3  w-96 rounded-xl  ">
            Pågående flytstäd ({apartments.length})
          </h5>
        </div>
        {apartments &&
          apartments.map((apartment) => (
            <div className="border border-b-2  p-5" key={apartment._id}>
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
                  <span className="font-bold"> Planerat Start Datum:</span>{" "}
                  {new Date(apartment.startDate).toLocaleString()}
                </li>
                <li className="mb-2 border-b-2 border-indigo-200 p-2 ">
                  <span className="font-bold"> Planerat Slut Datum:</span>{" "}
                  {new Date(apartment.endDate).toLocaleString()}
                </li>
                {apartment.status === "Ej påbörjat" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-red-700 hover:bg-gray-200 ">
                    <span className="font-bold"> Status:</span>{" "}
                    {apartment.status}
                  </li>
                )}

                {apartment.status === "Påbörjat" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-orange-400 hover:bg-gray-200 ">
                    <span className="font-bold"> Status:</span>{" "}
                    {apartment.status}
                  </li>
                )}

                {apartment.status === "Färdigt" && (
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 text-green-600 hover:bg-gray-200 ">
                    <span className="font-bold "> Status:</span>{" "}
                    {apartment.status}
                  </li>
                )}
                <div className="flex  justify-between items-center text-center my-5 w-1/2">
                  <Link
                    href={`/apartments/${apartment._id}/edit`}
                    className=" bg-green-200 p-3   hover:bg-green-300 rounded-xl w-full">
                    Update
                  </Link>
                  <button
                    type="submit"
                    onClick={() => handleDelete(apartment._id)}
                    className=" bg-red-200 p-3   hover:bg-red-300  rounded-xl w-full ml-2">
                    Delete
                  </button>
                </div>
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
