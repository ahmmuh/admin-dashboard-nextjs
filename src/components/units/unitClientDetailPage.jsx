"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUnitByID } from "@/backend/api";
import LoadingPage from "@/app/loading";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";

export default function UnitClientDetailPage() {
  const { unitId } = useParams();
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser, loading } = useFetchCurrentUser();
  useEffect(() => {
    if (!unitId) return;

    const fetchUnit = async () => {
      try {
        const data = await getUnitByID(unitId);
        if (!data) {
          setError("Enheten hittades inte.");
        } else {
          // console.log("UNIT", data);
          setUnit(data);
        }
      } catch (err) {
        // console.error("Fel vid hämtning av enhet:", err.message);
        setError("Kunde inte hämta enhetsdata.");
      }
    };

    fetchUnit();
  }, [unitId]);

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-600">{error}</h2>
      </div>
    );
  }

  if (!unit) {
    return <LoadingPage message="Hämtar enhetdata..." />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        <HiOutlineOfficeBuilding /> {unit.name}
      </h1>
      {/* {unit.users.map((user) => (
        <p key={user._id}>
          {" "}
          {user && user.role === "Specialare" && (
            <span>
              {user.role}: {user.name}
            </span>
          )}
        </p>
      ))} */}
      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Adress:</span> {unit.address}
      </p>
      <p className="text-gray-800 mb-2">
        <span className="font-semibold">Skapad:</span>{" "}
        {new Date(unit.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
