import React from "react";

import { getUnitByID } from "@/backend/api";
import ListPage from "@/components/personList";
import PersonList from "@/components/personList";
import SpecialistActions from "@/components/actions/specialistActions";

async function SpecialistPage({ params }) {
  console.log("Specialister ", params.unitId);
  const { unitId } = params;
  const unit = await getUnitByID(unitId);
  return (
    <div className="flex flex-col text-blue-600 ">
      <h4 className="text-2xl ">Specialister på {unit.name}</h4>
      {unit.specialister.map((specialist) => (
        <PersonList
          name={specialist ? specialist.name : "No specialist än"}
          phone={specialist ? specialist.phone : "Inget telefonnummer"}
          email={specialist ? specialist.email : "Ingen e-post"}>
          <SpecialistActions unitId={unitId} specialist={specialist} />
        </PersonList>
      ))}
    </div>
  );
}

export default SpecialistPage;
