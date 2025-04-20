import Link from "next/link";
import React from "react";

function ApartmentList({ apartments }) {
  console.log("Apartment i apartment list", apartments);
  return (
    <div className=" p-6">
      <h4 className="text-2xl mb-10 font-bold">Alla lägenheter</h4>
      <div className=" flex justify-start flex-col ">
        {apartments &&
          apartments.map((apartment) => (
            <div className="border border-b-2  p-5">
              <Link href={`/apartments/${apartment._id}/create`}>
                Ny lägenhet
              </Link>

              <h4 className="font-bold">
                Var ligger lägenheten? {apartment.apartmentLocation}
              </h4>
              <ul className="flex justify-start p-6  flex-col">
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
                  <span className="font-bold"> Start Datum:</span>{" "}
                  {new Date(apartment.startDate).toLocaleString()}
                </li>
                {/* <li className="mb-2 border-b-2 border-indigo-200 p-2 ">
                  <span className="font-bold"> Slut Datum:</span>{" "}
                  {new Date(apartment.endDate).toLocaleString()}
                </li> */}
                <li className="mb-2 border-b-2 border-indigo-200 p-2 hover:bg-gray-200 ">
                  <span className="font-bold"> Status:</span> {apartment.status}
                </li>
                <div className="flex  items-start my-5">
                  <Link href={`/apartments/${apartment._id}/edit`}>Update</Link>
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
