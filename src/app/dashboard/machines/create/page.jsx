"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchUnits } from "@/customhook/useFetchUnits";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import LoadingPage from "@/app/loading";

export default function CreateMachinePage() {
  const router = useRouter();
  const { addMachine } = useFetchMachines();
  const { units, loading: unitsLoading, error: unitsError } = useFetchUnits();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    unitId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!form.unitId) {
    //   displayErrorMessage("Du måste välja en enhet!");
    //   return;
    // }

    try {
      if (!form.name) {
        displayErrorMessage("Ange maskinens namn.");
        return;
      }

      if (!form.unitId) {
        displayErrorMessage("Välj en enhet från rullgardinsmenyn.");
        return;
      }

      await addMachine({
        name: form.name,
        unitId: form.unitId,
      });

      displaySuccessMessage("Maskin skapad ✅");
      router.push("/dashboard/machines");
    } catch (err) {
      // console.error(err);
      displayErrorMessage("Kunde inte skapa maskinen ❌");
    }
  };

  if (unitsLoading) return <LoadingPage message="Hämtar maskiner..." />;
  if (unitsError)
    return (
      <p className="text-red-500">Fel vid hämtning: {unitsError.message}</p>
    );

  return (
    <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl text-blue-600 mb-8 text-center">Skapa maskin</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Namn */}
        <div>
          <label className="block text-sm font-medium mb-2">Maskinnamn</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-lg"
            placeholder="Skriv maskinens namn"
          />
        </div>

        {/* Välj enhet */}
        <div>
          <label className="block text-sm font-medium mb-2">Välj enhet</label>
          <select
            name="unitId"
            value={form.unitId}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 text-lg">
            <option value="">-- Välj enhet --</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard/machines")}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-3 rounded-lg text-lg">
            Avbryt
          </button>
          <button
            type="submit"
            className="p-2 w-1/3 bg-indigo-100 text-indigo-800 font-medium 
             border border-indigo-200 rounded-md shadow-sm 
             hover:bg-indigo-200 transition">
            Skapa maskin
          </button>
        </div>
      </form>
    </div>
  );
}
