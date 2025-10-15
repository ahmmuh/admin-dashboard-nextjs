"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteWorkplace,
  getAllWorkPlaces,
  assignUserToWorkPlace,
  removeUserFromWorkPlace,
} from "@/backend/workplaceAPI";
import { getAllUsers } from "@/backend/allUsersAPI";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";

export default function WorkPlacePage() {
  const [workplaces, setWorkplaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hämta arbetsplatser och användare
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wpData = await getAllWorkPlaces();
        const userData = await getAllUsers();

        setWorkplaces(wpData || []);
        setUsers(userData || []);
      } catch (err) {
        // console.error(err);
        setError("Något gick fel vid hämtning.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Ta bort arbetsplats
  const handleDelete = async (id) => {
    if (!confirm("Är du säker på att du vill ta bort denna arbetsplats?"))
      return;

    try {
      await deleteWorkplace(id);
      setWorkplaces((prev) => prev.filter((wp) => wp._id !== id));
    } catch (err) {
      // console.error("Error deleting workplace:", err.message);
      alert("Kunde inte ta bort arbetsplatsen.");
    }
  };

  // Hantera select-change
  const handleSelectUser = (workplaceId, userId) => {
    setSelectedUsers((prev) => ({ ...prev, [workplaceId]: userId }));
  };

  //Ta bort tilldelad användare från en arbetsplats
  const handleRemoveUser = async (workplaceId, userId) => {
    try {
      const result = await removeUserFromWorkPlace(workplaceId, userId);

      if (result?.workPlace) {
        // Uppdatera state med den nya arbetsplatsen från backend
        setWorkplaces((prev) =>
          prev.map((wp) => (wp._id === workplaceId ? result.workPlace : wp))
        );
        displaySuccessMessage("Användare borttagen!");
      } else {
        displayErrorMessage("Kunde inte ta bort användare.");
      }
    } catch (error) {
      // console.error("Fel vid borttagning av användare:", error);
      displayErrorMessage("Något gick fel vid borttagning.");
    }
  };

  // Tilldela användare
  // const handleAssignUser = async (workplaceId) => {
  //   const userId = selectedUsers[workplaceId];
  //   if (!userId) return displayErrorMessage("Välj en användare först!");

  //   try {
  //     const result = await assignUserToWorkPlace(workplaceId, userId);
  //     if (result) {
  //       displaySuccessMessage("Användare tilldelad!");
  //       setWorkplaces((prev) =>
  //         prev.map((wp) =>
  //           wp._id === workplaceId
  //             ? { ...wp, cleaners: [...(wp.cleaners || []), result.user] }
  //             : wp
  //         )
  //       );
  //       setSelectedUsers((prev) => ({ ...prev, [workplaceId]: "" }));
  //     }
  //   } catch (err) {
  //     console.error("Error assigning user:", err.message);
  //     displayErrorMessage("Kunde inte tilldela användare.");
  //   }
  // };
  const handleAssignUser = async (workplaceId) => {
    const userId = selectedUsers[workplaceId];
    if (!userId) return displayErrorMessage("Välj en användare först!");

    try {
      const result = await assignUserToWorkPlace(workplaceId, userId);
      if (result?.workPlace) {
        // Uppdatera hela arbetsplatsen med den populaerade versionen från backend
        setWorkplaces((prev) =>
          prev.map((wp) => (wp._id === workplaceId ? result.workPlace : wp))
        );
        displaySuccessMessage("Användare tilldelad!");
        setSelectedUsers((prev) => ({ ...prev, [workplaceId]: "" }));
      } else {
        displayErrorMessage("Kunde inte tilldela användare.");
      }
    } catch (err) {
      // console.error("Error assigning user:", err.message);
      displayErrorMessage("Kunde inte tilldela användare.");
    }
  };

  if (loading) return <LoadingPage message="Vi hämtar arbetsplats åt dig..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col px-6 py-4 gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-blue-500">Arbetsplatser</h2>
      </div>
      <Link
        href="/dashboard/workplaces/create"
        className="text-green-800  flex items-center gap-3">
        {" "}
        <FontAwesomeIcon icon={faPlus} /> Skapa arbetsplats
      </Link>
      {/* Header med Skapa-knapp */}

      {/* Lista arbetsplatser */}
      {workplaces.length > 0 ? (
        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
          {workplaces.map((wp) => (
            <div
              key={wp._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-blue-900">
                {wp.name}
              </h3>
              <p className="text-gray-700">
                <strong>Adress:</strong> {wp.address || "-"}
              </p>
              <p className="text-gray-700">
                <strong>Koordinater:</strong>{" "}
                {wp.location?.coordinates?.join(", ") || "-"}
              </p>
              {/* Visar tilldelade användare */}
              {wp.cleaners && wp.cleaners.length > 0 ? (
                <div className="mt-2">
                  <strong>Här jobbar:</strong>
                  <ul className="mt-1  bg-gray-200 p-4">
                    {wp.cleaners.map((user) => (
                      <li
                        key={user._id}
                        className="inline-flex items-center gap-1  px-2 py-1 rounded shadow">
                        <span>{user?.name}</span>
                        <button
                          onClick={() => handleRemoveUser(wp._id, user?._id)}
                          className="text-red-500 hover:text-red-700 font-bold">
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">Inga användare tilldelade.</p>
              )}

              {/* Tilldela användare */}
              <div className="flex items-center gap-2">
                <select
                  className="border rounded px-2 py-1"
                  value={selectedUsers[wp._id] || ""}
                  onChange={(e) => handleSelectUser(wp._id, e.target.value)}>
                  <option value="">Välj användare</option>

                  {users && users.length > 0 ? (
                    users
                      .filter((user) =>
                        Array.isArray(user.role)
                          ? user.role.some(
                              (r) =>
                                r.toLowerCase() === "lokalvårdare" ||
                                r.toLowerCase() === "specialare"
                            )
                          : ["lokalvårdare", "specialare"].includes(
                              user.role?.toLowerCase()
                            )
                      )
                      .map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name}
                        </option>
                      ))
                  ) : (
                    <option disabled>Inga användare tillgängliga</option>
                  )}
                </select>

                <button
                  onClick={() => handleAssignUser(wp._id)}
                  disabled={!selectedUsers[wp._id]}
                  className={`flex items-center gap-2 px-3 py-1 rounded shadow text-white ${
                    selectedUsers[wp._id]
                      ? "bg-blue-400 hover:bg-blue-500"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}>
                  <FontAwesomeIcon icon={faUserPlus} /> Tilldela
                </button>
              </div>

              {/* Edit & Delete */}
              <div className="flex gap-4 mt-3">
                <Link
                  href={`/dashboard/workplaces/${wp._id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-800 border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-200 transition">
                  <HiOutlinePencilAlt className="w-5 h-5" />
                  Redigera
                </Link>
                <button
                  onClick={() => handleDelete(wp._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-md shadow-sm hover:bg-red-200 transition">
                  <HiOutlineTrash className="w-5 h-5" />
                  Ta bort
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Inga arbetsplatser tillagda än.</p>
      )}
    </div>
  );
}
