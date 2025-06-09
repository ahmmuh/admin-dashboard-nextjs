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
      <h4 className="text-2xl ">Specialist(er) på {unit.name}</h4>
      <>
        {unit.users.length < 2 && (
          <>
            <CustomLink
              className="bg-green-100 text-black w-48 my-5 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
              title={"Ny specialist"}
              url={`/dashboard/units/${unitId}/specialister/create`}
            />
          </>
        )}
      </>
      {unit.users &&
        unit.users
          .filter((user) => user.role === "Specialist")
          .map((specialist) => (
            <PersonList
              key={specialist._id}
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
