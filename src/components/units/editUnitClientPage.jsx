"use client";

import LoadingPage from "@/app/loading";
import { getUnitByID, updateUnit } from "@/backend/api";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditUnitClientPage() {
  const router = useRouter();
  const params = useParams();
  const { unitId } = params;

  const [unit, setUnit] = useState({
    name: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const data = await getUnitByID(unitId);
        console.log("Editable unit", data);
        setUnit(data);
      } catch (err) {
        console.error("Fel vid hämtning:", err.message);
        displayErrorMessage("❌ Kunde inte hämta enheten");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (unitId) fetchUnit();
  }, [unitId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUnit = {
        name: unit.name,
        address: unit.address,
      };

      await updateUnit(unitId, updatedUnit);

      displaySuccessMessage("✅ Enhet uppdaterad");
      router.push("/dashboard/units");
    } catch (err) {
      console.error("Fel vid uppdatering:", err.message);
      displayErrorMessage(`Fel: ${err.message}`);
    }
  };

  if (loading) return <LoadingPage message="Laddar enhet..." />;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl  mb-4 text-blue-500">Redigera enhet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">
            Namn{" "}
            <span className="text-sm font-normal" style={{ fontSize: 12 }}>
              t.ex. Enhet Öst 2
            </span>
          </label>
          <input
            name="name"
            type="text"
            value={unit.name}
            onChange={(e) => setUnit({ ...unit, name: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Address{" "}
            <span className="text-sm font-normal" style={{ fontSize: 12 }}>
              En central address för enheten
            </span>
          </label>
          <input
            name="address"
            type="text"
            value={unit.address}
            onChange={(e) => setUnit({ ...unit, address: e.target.value })}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-1/2 bg-indigo-200   border-indigo-300  shadow-sm hover:bg-indigo-300 transition  px-4 py-2 rounded">
          Spara
        </button>
      </form>
    </div>
  );
}
