"use client";
import { createWorkPlace } from "@/backend/workplaceAPI";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CreateWorkplaceComponent = () => {
  const router = useRouter();
  const [newWorkplace, setNewWorkPlace] = useState({
    name: "",
    address: "", // ändrat från location → address
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await createWorkPlace(newWorkplace);
      if (result?.workPlace) {
        displaySuccessMessage("Arbetsplats skapad!");
        setNewWorkPlace({ name: "", address: "" });
        router.back();
      } else {
        setMessage("⚠️ Kunde inte skapa arbetsplats.");
      }
    } catch (err) {
      console.error(err);
      displayErrorMessage("Fel vid skapande.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("State Uppdateras ", newWorkplace);
  }, [newWorkplace]);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-blue-500 text-xl">Skapa en ny arbetsplats</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Namn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Namn
          </label>
          <input
            name="name"
            type="text"
            value={newWorkplace.name}
            onChange={(e) =>
              setNewWorkPlace((prev) => ({ ...prev, name: e.target.value }))
            }
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
            placeholder="Ange arbetsplatsens namn"
          />
        </div>

        {/* Adress */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adress
          </label>
          <input
            name="address"
            type="text"
            value={newWorkplace.address}
            onChange={(e) =>
              setNewWorkPlace((prev) => ({ ...prev, address: e.target.value }))
            }
            className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
            placeholder="Ange arbetsplatsens adress"
          />
        </div>

        {/* Spara-knapp */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-400 border border-indigo-300 hover:bg-indigo-300 text-center w-32 p-2 rounded shadow shadow-blue-300 transition text-white disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "Sparar..." : "Spara"}
        </button>
      </form>

      {/* Feedback-meddelande */}
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default CreateWorkplaceComponent;
