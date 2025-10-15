"use client";
import React, { useEffect, useState } from "react";
import { getUnitByID } from "@/backend/api";
import ActionsHandler from "@/components/actions/actionsHandler";
import PersonList from "@/components/personList";
import LoadingPage from "@/app/loading";
import SystemGuideWrapper from "@/components/guides/SystemGuideWrapper";
import { useParams } from "next/navigation";

function ChefPage({ params }) {
  const { unitId } = useParams();

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
        }
        setUnit(data);
      } catch (err) {
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }
    if (unitId) fetchUnit();
  }, [unitId]);

  if (loading) return <LoadingPage message="Laddar användardetaljer..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  const filterUser = unit?.users?.filter((user) =>
    user.role?.some((r) => r === "Enhetschef")
  );

  if (!filterUser || filterUser.length === 0) {
    return (
      <p className="text-red-600 text-2xl">
        Det finns ingen chef för denna enhet
      </p>
    );
  }

  const chef = filterUser[0];

  return (
    <div className="chef-personlist">
      <PersonList
        id="chef-personlist"
        unit={unit?.name}
        name={chef.name}
        phone={chef.phone || "Ingen telefon"}
        email={chef.email || "Ingen e-post"}
        role={chef.role}>
        <ActionsHandler
          id="chef-actions"
          unitId={unitId}
          chef={chef}
          onDelete={(id) => {
            setUnit((prev) => ({
              ...prev,
              users: prev.users.filter((u) => u._id !== id),
            }));
          }}
        />
      </PersonList>
    </div>
  );
}

export default ChefPage;
