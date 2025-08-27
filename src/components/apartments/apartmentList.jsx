"use client";
import { deleteApartment, getApartments } from "@/backend/apartmentAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { displayErrorMessage } from "@/helper/toastAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SearchApartment from "./searchApartment";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import LoadingPage from "@/app/loading";

function ApartmentList({ apartments: initialApartments }) {
  const [apartments, setApartments] = useState(initialApartments);
  const router = useRouter();
  const { currentUser, loading } = useFetchCurrentUser();

  useEffect(() => {
    setApartments(initialApartments);
  }, [initialApartments]);

  const handleDelete = async (id) => {
    const lgh = await deleteApartment(id);
    const updatedApartments = await getApartments();
    setApartments(updatedApartments);
    displayErrorMessage("lägenhet: har tagits bort");
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {currentUser.role?.some(
            (r) =>
              r === "Avdelningschef" ||
              r === "Områdeschef" ||
              r === "Flyttstädansvarig"
          ) && (
            <Link
              className="flex justify-center gap-x-5 items-center bg-green-200 px-4 py-2 text-black w-1/3 text-center rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
              href={`/dashboard/apartments/create`}>
              Ny flyttstäd
            </Link>
          )}

          <h5 className="bg-blue-100 text-blue-800 font-medium px-5 py-3 w-full sm:w-96 rounded-xl border border-blue-200">
            Pågående flyttstäd ({apartments?.length})
          </h5>
        </div>

        {apartments.length === 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-gray-600 text-lg">
              Det finns inga lägenheter att visa just nu
            </p>
          </div>
        ) : (
          <div>
            <h5 className="text-2xl mb-10  text-purple-500">Alla Flyttstäd</h5>

            <div className="hidden md:block">
              <SearchApartment />
            </div>
            {apartments.map((apartment) => (
              <div className="border border-b-2 p-5 mb-8" key={apartment._id}>
                <ul className="flex justify-start p-6 flex-col bg-gray-50 rounded-md shadow-sm">
                  <li className="border border-b-4 p-4 border-b-orange-400 bg-gray-200">
                    <span className="font-bold">Lägenheten ligger på:</span>{" "}
                    {apartment.apartmentLocation}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Tilldelad:</span>{" "}
                    {apartment.assignedUnit.name}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Nycklarna finns på:</span>{" "}
                    {apartment.keyLocation}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Beskrivning:</span>{" "}
                    {apartment.description}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Prioritet:</span>{" "}
                    {apartment.priority}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Start Datum:</span>{" "}
                    {new Date(apartment.startDate).toLocaleDateString()}
                  </li>
                  <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200">
                    <span className="font-bold">Slut Datum:</span>{" "}
                    {new Date(apartment.endDate).toLocaleDateString()}
                  </li>

                  {/* Status */}
                  {apartment.status === "Ej påbörjat" && (
                    <li className="mb-2 border-b-2 border-indigo-200 p-2 text-red-800 hover:bg-gray-200">
                      <span className="font-bold">Status:</span>{" "}
                      {apartment.status}{" "}
                      <span className="text-gray-800">
                        | Skapad:{" "}
                        {new Date(apartment.updatedAt).toLocaleString()}
                      </span>
                    </li>
                  )}

                  {apartment.status === "Påbörjat" && (
                    <li className="mb-2 border-b-2 border-indigo-200 p-2 text-orange-500 hover:bg-gray-200">
                      <span className="font-bold">Status:</span>{" "}
                      {apartment.status}{" "}
                      <span className="text-gray-800 text-sm">
                        | Senast ändrad:{" "}
                        {new Date(apartment.updatedAt).toLocaleString()}
                      </span>
                    </li>
                  )}

                  {apartment.status === "Färdigt" && (
                    <li className="mb-2 border-b-2 border-indigo-200 p-2 text-green-700 hover:bg-gray-200">
                      <span className="font-bold">Status:</span>{" "}
                      {apartment.status}{" "}
                      <span className="text-gray-800 text-sm">
                        | Senast ändrad:{" "}
                        {new Date(apartment.updatedAt).toLocaleString()}
                      </span>
                    </li>
                  )}

                  {/* Action buttons */}
                  {/* Action buttons */}
                  <div className="flex gap-3 mt-4">
                    {/* Uppdatera-knappen */}
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

                    {/* Ta bort-knappen */}
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
        )}
      </div>
    </div>
  );
}

export default ApartmentList;
