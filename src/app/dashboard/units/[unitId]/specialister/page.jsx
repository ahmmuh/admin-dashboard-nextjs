"use client";
import React, { useEffect, useState } from "react";
import { getUnitByID } from "@/backend/api";
import PersonList from "@/components/personList";
import SpecialistActions from "@/components/actions/specialistActions";
import LoadingPage from "@/app/loading";

function SpecialistPage({ params }) {
  const unitId = React.use(params).unitId;

  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUnit() {
      setLoading(true);
      setError(null);
      try {
        const data = await getUnitByID(unitId);
        if (!data) setError("Kunde inte hämta enhet eller användare");
        else setUnit(data);
      } catch (err) {
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }
    if (unitId) fetchUnit();
  }, [unitId]);

  if (loading) return <LoadingPage message="Laddar specialister..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  const specialists =
    unit?.users?.filter((u) => u.role?.includes("Specialare")) || [];

  if (specialists.length === 0)
    return (
      <p className="text-red-600 text-2xl">
        Det finns inga specialister för denna enhet
      </p>
    );

  return (
    <div className="flex flex-col  mt-3">
      <h4 className="text-3xl mb-4 text-blue-500">Specialare på {unit.name}</h4>
      {specialists.map((specialist) => (
        <PersonList
          key={specialist._id}
          name={specialist.name || "Ingen specialare än"}
          phone={specialist.phone || "Inget telefonnummer"}
          email={specialist.email || "Ingen e-post"}>
          <SpecialistActions
            unitId={unitId}
            specialist={specialist}
            onDelete={(id) =>
              setUnit((prev) => ({
                ...prev,
                users: prev.users.filter((u) => u._id !== id),
              }))
            }
          />
        </PersonList>
      ))}
    </div>
  );
}

export default SpecialistPage;
