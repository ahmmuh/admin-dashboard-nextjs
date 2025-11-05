"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFetchKeys } from "@/customhook/useFetchKeys";
import LoadingPage from "@/app/loading";

const COLORS = ["#ef4444", "#10b981"]; // Röd för utlånade, grön för inne

function KeyPieChart() {
  const { keys, loading, error } = useFetchKeys();

  if (loading) return <LoadingPage message="Hämtar nycklar..." />;
  if (error)
    return <div className="text-red-600 p-2">Fel: {error.message}</div>;
  if (!keys || keys.length === 0) return <div>Inga nycklar hittades</div>;

  // Räkna antal utlånade och inne
  const loanedCount = keys.filter((k) => k.status === "checked-out").length;
  const insideCount = keys.filter((k) => k.status !== "checked-out").length;

  const data = [
    { name: "Utlånade", value: loanedCount },
    { name: "Inne", value: insideCount },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2">Nycklar - status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default KeyPieChart;
