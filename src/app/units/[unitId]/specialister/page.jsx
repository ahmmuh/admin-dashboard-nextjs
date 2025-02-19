import React from "react";

import { getUnitByID } from "@/backend/api";
import ListPage from "@/components/personList";
import PersonList from "@/components/personList";
import ActionsHandler from "@/components/actions/actionsHandler";

async function SpecialistPage({ params }) {
  console.log("Specialister ", params.unitId);
  const unit = await getUnitByID(params.unitId);
  return (
    <div className="flex flex-col text-blue-600 ">
      <h4 className="text-2xl ">Specialister på {unit.name}</h4>
      {unit.specialister.map((specialist) => (
        <PersonList
          key={specialist._id}
          name={specialist.name}
          phone={specialist.phone}
          email={specialist.email}>
          <ActionsHandler id={specialist._id} />
        </PersonList>
      ))}
    </div>
  );
}

export default SpecialistPage;
