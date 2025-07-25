"use client";

import { createUnit } from "@/backend/api";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateUnitClientPage() {
  const router = useRouter();
  const [unit, setUnit] = useState({
    name: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUnit = {
        name: unit.name,
        address: unit.address,
      };
      const unitData = await createUnit(newUnit);

      setUnit(unitData);
      displaySuccessMessage("Ny enhet skapats");
      router.push("/dashboard");
      console.log("NEW ENHET", newUnit);
    } catch (err) {
      console.error("Fel vid skapande:", err.message);
      displayErrorMessage(`❌ Fel: ${err.message}`);
      router.push("/dashboard");
    }
  };

  return (
    <div className=" mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Skapa Ny Enhet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Namn</label>
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
          <label className="block font-medium">Adress</label>
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
          className="w-1/2 bg-green-300 text-black px-4 py-2 rounded hover:bg-green-400">
          Skapa
        </button>
      </form>
    </div>
  );
}
