"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUnitByID } from "@/backend/api";
import { HiOutlineKey } from "react-icons/hi";
import LoadingPage from "@/app/loading";

function UnitKeys() {
  const params = useParams();
  const unitId = params?.unitId;
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!unitId) return;
    async function fetchUnit() {
      setLoading(true);
      try {
        const data = await getUnitByID(unitId);
        if (!data) {
          setError("Kunde inte hämta nycklar");
        }
        console.log("Key i UnitKeys", data);
        setUnit(data);
      } catch (err) {
        console.error(err);
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }
    fetchUnit();
  }, [unitId]);

  if (loading) return <LoadingPage message="Hämtar enhetens nycklar" />;
  if (error) return <p className="p-5 text-red-600 font-semibold">{error}</p>;

  const { keys } = unit;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 border-b pb-2">
        Nycklar för enheten: {unit.name}
      </h1>

      <div
        className={`space-y-6 ${
          keys.length > 10 ? "max-h-[400px] overflow-x-scroll" : ""
        }`}>
        {keys &&
        keys.filter((key) => key.status === "checked-out").length > 0 ? (
          keys
            .filter((key) => key.status === "checked-out")
            .map((key) => (
              <div
                key={key._id}
                className="bg-white shadow-md rounded-md p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                    <HiOutlineKey className="text-purple-600 w-5 h-5" />
                    {key.keyLabel}
                  </h2>
                  <span className="px-3 py-1 text-sm rounded-full font-medium bg-orange-100 text-orange-800">
                    Utlånad
                  </span>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  {key.borrowedBy && (
                    <p>
                      <strong>Just nu hos:</strong> {key.borrowedBy.name}
                    </p>
                  )}
                  {key.lastBorrowedBy && (
                    <p>
                      <strong>Senast lånad av:</strong>{" "}
                      {key.lastBorrowedBy.name}
                    </p>
                  )}

                  {key.location && (
                    <p>
                      <strong>Tillhör:</strong> {key.location}
                    </p>
                  )}

                  <p className="text-xs text-gray-500">
                    Uppdaterad: {new Date(key.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-gray-500">Inga utlånade nycklar.</p>
        )}
      </div>
    </div>
  );
}

export default UnitKeys;
