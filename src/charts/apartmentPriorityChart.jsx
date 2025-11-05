"use client";

import LoadingPage from "@/app/loading";
import { useFetchApartments } from "@/customhook/useFetchApartments";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function ApartmentPriorityChart() {
  const { apartments, loading, error } = useFetchApartments();

  if (loading) return <LoadingPage message="Hämtar lägenheter..." />;
  if (error)
    return <div className="text-red-600 p-2">Fel: {error.message}</div>;
  if (!apartments || apartments.length === 0)
    return <div>Inga flyttstäd hittades</div>;

  // Grupp per enhet
  const unitsMap = {};
  apartments.forEach((apartment) => {
    const unitName = apartment.assignedUnit?.name || "Ingen enhet";

    if (!unitsMap[unitName]) {
      unitsMap[unitName] = {
        unitName,
        Låg: 0,
        Normal: 0,
        Hög: 0,
      };
    }

    unitsMap[unitName][apartment.priority] += 1;
  });

  const dataPerUnit = Object.values(unitsMap);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Prioritet per enhet</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={dataPerUnit}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="unitName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Låg" fill="#fcd34d" />
          <Bar dataKey="Normal" fill="#3b82f6" />
          <Bar dataKey="Hög" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ApartmentPriorityChart;
