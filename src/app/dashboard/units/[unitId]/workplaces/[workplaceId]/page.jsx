"use client";
import { getWorkplace } from "@/backend/api";
import CustomLink from "@/components/link";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

function WorkPlaceDetails({ params }) {
  const { unitId, workplaceId } = React.use(params);

  const [workPlace, setWorkPlace] = useState({});

  useEffect(() => {
    const fetchWorkPlace = async () => {
      try {
        const place = await getWorkplace(unitId, workplaceId);
        if (!place) return;

        console.log("WORK PLACE DATA IN WorkPlaceDetails", place);
        setWorkPlace(place);
      } catch (error) {
        console.error("ERROR, ", error.message);
      }
    };
    fetchWorkPlace();
  }, [unitId, workplaceId]);
  return (
    <div className="flex flex-col  lg:w-1/2 h-56 bg-gray-200 cursor-pointer   text-black border">
      <div className="bg-red-700 py-3 w-full"></div>
      <div className="p-5">
        <h3 className="text-2xl">{workPlace.name}</h3>
        <p>{workPlace.location}</p>
        <div className="border border-b-gray-400 mt-4"></div>
        <p className="text-xl">
          Antal medarbetare på plats {workPlace?.cleaners?.length}
        </p>
        <div className="flex flex-row  items-center gap-4 p-2">
          <CustomLink
            url={`/units/${unitId}/workplaces/edit/?workPlaceId=${workPlace._id}&name=${workPlace.name}&location=${workPlace.location}`}
            title={<FontAwesomeIcon icon={faEdit} />}
            className={
              "  text-blue-500  w-32 rounded text-2xl hover:text-blue-700 transition"
            }></CustomLink>

          <button
            className=" rounded text-red-500 p-2
         shadow shadow-blue-300 hover:bg-red-100 transition">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkPlaceDetails;
