"use client";

import React, { useState, useEffect } from "react";
import { getWorkPlaceById, updateWorkPlace } from "@/backend/workplaceAPI";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { useRouter } from "next/navigation";

export default function EditWorkPlaceClientComponent({ workPlaceId }) {
  const router = useRouter();
  console.log("workPlaceId i EditWorkPlaceClientComponent", workPlaceId);
  const [workPlace, setWorkPlace] = useState({
    name: "",
    location: "",
    address: "",
  });
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workPlaceId) return;

    const fetchWorkPlace = async () => {
      try {
        const data = await getWorkPlaceById(workPlaceId);
        setWorkPlace({
          name: data.name || "",
          location: data.location || "",
          address: data.address || "",
        });
        setAssignedUsers(data.cleaners || []);
      } catch (err) {
        console.error("Kunde inte hämta arbetsplats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkPlace();
  }, [workPlaceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateWorkPlace(workPlaceId, workPlace);
      if (updated) {
        setWorkPlace({
          name: updated.name,
          location: updated.location,
          address: updated.address,
        });
      }
      displaySuccessMessage("Arbetsplatsen har uppdaterats!");
      router.push("/dashboard/workplaces");
    } catch (err) {
      console.error("Fel vid uppdatering:", err.message);
      displayErrorMessage("Kunde inte uppdatera arbetsplatsen.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-blue-400 text-xl">
        {loading
          ? "Hämtar arbetsplats åt dig..."
          : `Du uppdaterar - ${workPlace.name}`}
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          value={workPlace.name}
          onChange={(e) => setWorkPlace({ ...workPlace, name: e.target.value })}
          placeholder="Arbetsplats namn"
          className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
        />

        <input
          type="text"
          name="address"
          value={workPlace.address}
          onChange={(e) =>
            setWorkPlace({ ...workPlace, address: e.target.value })
          }
          placeholder="Arbetsplats adress"
          className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
        />

        {/* <input
          type="text"
          name="location"
          value={workPlace.location}
          onChange={(e) =>
            setWorkPlace({ ...workPlace, location: e.target.value })
          }
          placeholder="Arbetsplats koordinater"
          className="p-2 w-full border border-blue-500 rounded-xl focus:bg-yellow-200"
        /> */}

        <button className="bg-blue-400 hover:bg-blue-500 text-white w-32 p-2 rounded shadow transition">
          Spara
        </button>
      </form>

      <div className="mt-4">
        <h5 className="text-lg font-semibold">Tilldelade användare:</h5>
        {assignedUsers.length > 0 ? (
          <ul className="list-disc ml-5 mt-2">
            {assignedUsers.map((user) => (
              <li key={user._id}>
                {user.name} ({user.role.join(", ")})
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {loading
              ? "Hämtar användare..."
              : "Inga användare tilldelade denna arbetsplats."}
          </p>
        )}
      </div>
    </div>
  );
}
