"use client";

import React from "react";
import LoadingPage from "@/app/loading";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useFetchClock } from "@/customhook/useFetchClock";

function ClockChart() {
  const { clocks, loading, error } = useFetchClock();

  if (loading) return <LoadingPage message="Hämtar stämplade användare..." />;
  if (error)
    return <div className="text-red-600 p-2">Fel: {error.message}</div>;
  if (!clocks || clocks.length === 0)
    return <div>Inga användare är stämplade in</div>;

  // Grupp per enhet
  const unitsMap = {};
  clocks.forEach((clock) => {
    const unitName = clock.user?.unit?.name || "Ingen enhet";
    unitsMap[unitName] = (unitsMap[unitName] || 0) + 1;
  });

  const dataPerUnit = Object.entries(unitsMap).map(([unitName, clockedIn]) => ({
    unitName,
    clockedIn,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Användare stämplade in per enhet</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dataPerUnit}
          margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <XAxis dataKey="unitName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="clockedIn"
            name="Antal stämplade in"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClockChart;
