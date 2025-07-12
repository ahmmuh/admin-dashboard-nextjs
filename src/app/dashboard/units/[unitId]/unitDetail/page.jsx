import { getUnitByID } from "@/backend/api";
import React from "react";

async function DetailPage({ params }) {
  const { unitId } = params;
  console.log("UNIT ID i DetailPage", unitId);
  try {
    const unit = await getUnitByID(unitId);
    console.log("Fetched unit from API:", unit);

    if (!unit) {
      return (
        <div className="p-6">
          <h2 className="text-xl text-red-600">Enheten hittades inte.</h2>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🏢 {unit.name}
        </h1>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Beskrivning:</span>{" "}
          {unit.description || "Ingen beskrivning tillgänglig."}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <span className="font-semibold">Enhets-ID:</span> {unit._id}
        </p>
      </div>
    );
  } catch (error) {
    console.error("Fel vid hämtning av enhet:", error);
    return (
      <div className="p-6">
        <h2 className="text-xl text-red-600">Kunde inte hämta enhetsdata.</h2>
      </div>
    );
  }
}

export default DetailPage;
