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

    const addressPattern =
      /^[A-Za-zÅÄÖa-zåäö\s]+\s\d+,\s\d{3}\s?\d{2}\s[A-Za-zÅÄÖa-zåäö\s]+,\s[A-Za-zÅÄÖa-zåäö\s]+$/;

    try {
      const newUnit = {
        name: unit.name,
        address: unit.address,
      };

      if (!newUnit.name) {
        displayErrorMessage("Ange enhetens namn.");
        return;
      }

      if (!newUnit.address) {
        displayErrorMessage("Ange fullständig adress.");
        return;
      }

      const exampleAddress = "Danmarksgatan 26, 753 23 Uppsala, Sverige";

      if (!addressPattern.test(newUnit.address.trim())) {
        displayErrorMessage(
          `Adressformatet är ogiltigt. Skriv adressen som exemplet: ${exampleAddress}`
        );
        return;
      }

      const unitData = await createUnit(newUnit);

      setUnit(unitData);
      displaySuccessMessage("Ny enhet skapats");
      router.push("/dashboard/units");
      // console.log("NEW ENHET", newUnit);
    } catch (err) {
      // console.error("Fel vid skapande:", err.message);
      displayErrorMessage(` Fel: ${err.message}`);
      router.push("/dashboard");
    }
  };

  return (
    <div className=" mx-auto p-6">
      <h1 className="mb-4 text-blue-600  text-2xl">Skapa ny enhet</h1>
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
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Address{" "}
            <span className="text-sm font-normal" style={{ fontSize: 12 }}>
              En central address för nya enheten
            </span>
          </label>
          <input
            name="address"
            type="text"
            value={unit.address}
            onChange={(e) => setUnit({ ...unit, address: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="p-2 w-1/3 bg-indigo-100 text-indigo-800 font-medium 
             border border-indigo-200 rounded-md shadow-sm 
             hover:bg-indigo-200 transition">
          Spara
        </button>
      </form>
    </div>
  );
}
