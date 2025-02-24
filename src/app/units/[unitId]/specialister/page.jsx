import React from "react";

import { getUnitByID } from "@/backend/api";
import ListPage from "@/components/personList";
import PersonList from "@/components/personList";
import SpecialistActions from "@/components/actions/specialistActions";
import CustomLink from "@/components/link";

async function SpecialistPage({ params }) {
  console.log("Specialister ", params.unitId);
  const { unitId } = params;
  const unit = await getUnitByID(unitId);
  return (
    <div className="flex flex-col text-blue-600 ">
      <h4 className="text-2xl ">Specialister på {unit.name}</h4>
      {!unit.specialister || unit.specialister.length === 0 ? (
        <>
          <p className="text-red-500 mb-4">Inga specialister än</p>
          <CustomLink
            className="bg-green-400 text-white w-48 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-500 transition duration-200"
            title={"Ny specialist"}
            url={`/units/${unitId}/specialister/create`}
          />
        </>
      ) : (
        unit.specialister.map((specialist) => (
          <PersonList
            name={specialist ? specialist.name : "No specialist än"}
            phone={specialist ? specialist.phone : "Inget telefonnummer"}
            email={specialist ? specialist.email : "Ingen e-post"}>
            <SpecialistActions unitId={unitId} specialist={specialist} />
          </PersonList>
        ))
      )}
    </div>
  );
}

export default SpecialistPage;
