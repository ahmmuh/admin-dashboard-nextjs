"use client";

import React, { useEffect, useState } from "react";

import { getUnitByID } from "@/backend/api";
import PersonList from "@/components/personList";
import SpecialistActions from "@/components/actions/specialistActions";
import CustomLink from "@/components/link";

function SpecialistPage({ params }) {
  const { unitId } = React.use(params);

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUnit() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUnitByID(unitId);
        if (!data) {
          setError("Kunde inte hämta enhet eller användare");
        } else {
          setUnit(data);
        }
      } catch (err) {
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }
    fetchUnit();
  }, [unitId]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col text-purple-500 mt-6 ">
      <h4 className="text-3xl ">Specialist(er) på {unit.name}</h4>
      {unit.users.length < 2 && (
        <CustomLink
          className="bg-green-100 text-black w-48 my-5 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
          title={"Ny specialist"}
          url={`/dashboard/units/${unitId}/specialister/create`}
        />
      )}

      {unit.users &&
        unit.users
          .filter((user) => user.role === "Specialist")
          .map((specialist) => (
            <PersonList
              key={specialist._id}
              name={specialist?.name || "No specialist än"}
              phone={specialist?.phone || "Inget telefonnummer"}
              email={specialist?.email || "Ingen e-post"}>
              <SpecialistActions unitId={unitId} specialist={specialist} />
            </PersonList>
          ))}
    </div>
  );
}

export default SpecialistPage;
