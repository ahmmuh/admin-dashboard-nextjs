"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUnitByID } from "@/backend/api";
import { HiOutlineKey } from "react-icons/hi";
import LoadingPage from "@/app/loading";
import KeySearch from "@/components/keys/keySearch";

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
        } else {
          setUnit(data);
        }
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

  const keys = unit?.keys || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl text-blue-700 mb-8 border-b pb-2">
        Nycklar för: {unit?.name}
      </h1>
      <KeySearch />

      <div
        className={`space-y-6 ${
          keys.length > 10 ? "h-[400px] overflow-y-auto" : ""
        }`}>
        {keys.length > 0 ? (
          keys.map((key) => (
            <div
              key={key._id}
              className="bg-white shadow-md rounded-md p-5 border border-gray-200">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                <HiOutlineKey className="text-purple-600 w-5 h-5" />
                {key.keyLabel}
              </h2>

              <div className="text-sm text-gray-700 mt-2">
                <p>
                  <strong>Tillhör:</strong>{" "}
                  {key.unit?.name || unit?.name || "–"}
                </p>
                <p>
                  <strong>Registrerad:</strong>{" "}
                  {new Date(key.createdAt).toLocaleDateString("sv-SE")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Inga nycklar registrerade.</p>
        )}
      </div>
    </div>
  );
}

export default UnitKeys;
