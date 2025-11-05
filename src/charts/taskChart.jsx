"use client";

import LoadingPage from "@/app/loading";
import { useFetchTask } from "@/customhook/useFetchTaskAPI";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DashboardTaskChart() {
  const { tasks, loading, error } = useFetchTask();

  if (loading) return <LoadingPage message="Hämtar uppgifter..." />;
  if (error) return <div className="text-red-600">Fel: {error.message}</div>;
  if (!tasks || tasks.length === 0) return <div>Inga morgonjobb hittades</div>;

  // Grupp per enhet
  const unitsMap = {};
  tasks.forEach((task) => {
    const unitName = (task.unit?.name || "Ingen enhet").replace(
      /^Enhet\s*/i,
      ""
    );

    if (!unitsMap[unitName]) {
      unitsMap[unitName] = {
        unitName,
        "Ej påbörjat": 0,
        Påbörjat: 0,
        Färdigt: 0,
      };
    }

    unitsMap[unitName][task.status] += 1;
  });

  const dataPerUnit = Object.values(unitsMap);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Morgonjobb per enhet</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={dataPerUnit}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="unitName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ej påbörjat" fill="#f59e0b" />
          <Bar dataKey="Påbörjat" fill="#4f46e5" />
          <Bar dataKey="Färdigt" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardTaskChart;
