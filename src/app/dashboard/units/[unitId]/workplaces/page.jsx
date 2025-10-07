"use client";

import React, { useEffect, useState } from "react";
import { getUnitByID } from "@/backend/api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function WorkPlacePage({ params }) {
  const { unitId } = React.use(params);

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const data = await getUnitByID(unitId);
        if (!data) {
          setError("Kunde inte hämta enheten.");
        } else {
          setUnit(data);
        }
      } catch (err) {
        setError("Något gick fel vid hämtning.");
      } finally {
        setLoading(false);
      }
    };

    fetchUnit();
  }, [params.unitId]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!unit) return <p>Ingen enhet hittades.</p>;

  return (
    <div className="flex flex-col text-blue-600 px-4">
      <h4 className="text-3xl font-bold mb-5">Objekt - {unit.name}</h4>
      <div className="flex flex-col cursor-pointer">
        <Link href={`/units/${unit._id}/workplaces/create`} className="w-10">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        {unit.workPlaces && unit.workPlaces.length > 0 ? (
          unit.workPlaces.map((workPlace) => (
            <div
              key={workPlace._id}
              className="bg-white p-8 border shadow shadow-red-200 rounded-2xl w-84 h-auto hover:bg-gray-300 mb-3">
              <h4 className="text-2xl text-blue-900">{workPlace.name}</h4>
              <p>Location Lapplandsresan 23b</p>
              <Link href={`/units/${unit._id}/workplaces/${workPlace._id}`}>
                Visa mer
              </Link>
            </div>
          ))
        ) : (
          <p>Inga arbetsplatser tillagda än.</p>
        )}
      </div>
    </div>
  );
}

export default WorkPlacePage;
