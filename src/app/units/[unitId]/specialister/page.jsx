import React from "react";

import { getUnitByID } from "@/backend/api";

async function SpecialistPage({ params }) {
  console.log("Specialister ", params.unitId);
  const unit = await getUnitByID(params.unitId);
  return (
    <div className="flex flex-col text-blue-600 ">
      <h4 className="text-2xl ">Specialister på {unit.name}</h4>
      <ul className="flex flex-col">
        {unit.specialister.map((specialist) => (
          <li
            key={specialist._id}
            className="mb-2 p-3 text-xl border-b
          border-b-gray-500">
            <p>{specialist.name}</p>
            <p>{specialist.phone}</p>
            <p>{specialist.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { unitId } = params!;

//   const unit = await getUnitByID(unitId);
//   return {
//     props: {
//       specialister: unit.specialister,
//     },
//   };
// };
export default SpecialistPage;
