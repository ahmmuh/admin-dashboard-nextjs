"use client";

import LoadingPage from "@/app/loading";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Ljusare färger: blå och orange
const COLORS = ["#60a5fa", "#fbbf24"];

function MaskinDonutChart() {
  const { machines, loading, error } = useFetchMachines();

  if (loading) return <LoadingPage message="Hämtar maskiner..." />;
  if (error)
    return <div className="text-red-600 p-2">Fel: {error.message}</div>;
  if (!machines || machines.length === 0)
    return <div>Inga maskiner hittades</div>;

  // Summera status
  let inne = 0;
  let utlånad = 0;
  machines.forEach((maskin) => {
    maskin.isAvailable ? inne++ : utlånad++;
  });

  const data = [
    { name: "Inne", value: inne },
    { name: "Utlånad", value: utlånad },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-semibold mb-2 text-center">
        Maskiner (Inne vs Utlånad)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60} // Donut-effekt
            label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} maskin(er)`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MaskinDonutChart;
