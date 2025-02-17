"use client";
import { getUnits } from "@/backend/api";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [selectedPage, setSelectedPage] = useState("Översikt");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const loadUnits = async () => {
      const units = await getUnits();
      if (units) {
        console.log("Units i Dashboard ", units);
        setUnits(units);
      } else {
        console.log("Error fetching units i ", units);
      }
    };
    loadUnits();
  }, []);

  return (
    <div className="flex justify-center h-screen ">
      <Sidebar units={units} />
      <main className="flex flex-col p-5">
        <h1 className="text-2xl font-bold mb-3">Välkommen till Dashboard 1</h1>
        {units.map((unit) => (
          <Link href={`/dashboard/${unit._id}/specialister`} key={unit._id}>
            {unit.name}
          </Link>
        ))}
      </main>
    </div>
  );
}

export default Dashboard;
