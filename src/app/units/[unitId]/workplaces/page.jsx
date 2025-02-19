import { getUnitByID } from "@/backend/api";
import ListPage from "@/components/personList";
import React from "react";

async function WorkPlacePage({ params }) {
  const unit = await getUnitByID(params.unitId);
  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Objekt - {unit.name}</h4>
      {unit.workpaces &&
        unit.workplaces.map((work) => (
          <ListPage key={work._id} name={work.name} />
        ))}
    </div>
  );
}

export default WorkPlacePage;
