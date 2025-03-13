import { getUnitByID, getWorkplace } from "@/backend/api";
import ListPage from "@/components/personList";
import Link from "next/link";
import React from "react";

async function WorkPlacePage({ params }) {
  const unit = await getUnitByID(params.unitId);
  console.log("workPlaces", unit.workPlaces);
  return (
    <div className="flex flex-col text-blue-600 px-4">
      <h4 className="text-3xl font-bold mb-5">Objekt - {unit.name}</h4>
      <div className="flex flex-col">
        <Link href={"ADD NY PLATS"}>Add</Link>
        {unit.workPlaces &&
          unit.workPlaces.length > 0 &&
          unit.workPlaces.map((workPlace) => (
            <div
              className="bg-gray-200 p-4 border shadow shadow-red-200 rounded-2xl w-84 h-auto
        hover:bg-gray-300 
        mb-3">
              <h4 className="text-2xl text-blue-900">{workPlace.name}</h4>
              <p>Location Lapplandsresan 23b</p>
              <Link
                href={`/units/${params.unitId}/workplaces/${workPlace._id}`}>
                Visa mer
              </Link>
            </div>  
          ))}
      </div>
    </div>
  );
}

export default WorkPlacePage;
