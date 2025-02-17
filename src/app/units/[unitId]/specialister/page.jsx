"use client";
import React, { useEffect, useState } from "react";

import { getUnitByID } from "@/backend/api";
import { useRouter } from "next/router";


const SpecialistPage = () => {
  const [loading, setLoading] = useState(true);
  const [specialister, setSpecialister] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { unitId } = router.query;

  useEffect(() => {
    const getUnit = async () => {
      const data = await fetch(`/units/${unitId}`);
      if (data.ok) {
        setSpecialister();
        setLoading(false);
      } else {
        setError("Error while we fetch data from server");
        setLoading(false);
      }
    };
    getUnit();
  }, [unitId]);
  return (
    <div className="flex flex-col">
      <h4 className="text-2xl font-bold">Specialist</h4>
      <ul className="flex flex-col">
        {specialister.map((specialist) => (
          <li key={specialist._id} className="mb-2">
            <p>{specialist.name}</p>
            <p>{specialist.phone}</p>
            <p>{specialist.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
