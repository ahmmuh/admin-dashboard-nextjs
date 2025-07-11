"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUnitByID } from "@/backend/api";

function UnitTasksPage() {
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
          setError("Kunde inte hämta uppgifter");
        }
        setUnit(data);
        console.log("TASK i UNIT TASK PAGE", data);
      } catch (err) {
        console.error(err);
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }

    fetchUnit();
  }, [unitId]);

  if (loading)
    return <p className="p-5 text-lg text-gray-700">Laddar uppgifter...</p>;

  if (error) return <p className="p-5 text-red-600 font-semibold">{error}</p>;

  const { tasks } = unit;
  console.log("TASK i UNIT TASK PAGE", tasks);

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6 border-b pb-2">
        Uppgifter för enhet: {unit?.name}
      </h1>

      {tasks && tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded-md shadow border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    task.status === "Ej påbörjat"
                      ? "bg-gray-200 text-gray-700"
                      : task.status === "Påbörjat"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}>
                  {task.status}
                </span>
              </div>

              {task.description && (
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              )}

              <div className="text-xs text-gray-500 flex flex-col sm:flex-row sm:gap-4">
                {task.status === "Available" && (
                  <span>
                    Skapad: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                )}
                <span>
                  Uppdaterad: {new Date(task.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Inga uppgifter hittades för denna enhet.
        </p>
      )}
    </div>
  );
}

export default UnitTasksPage;
