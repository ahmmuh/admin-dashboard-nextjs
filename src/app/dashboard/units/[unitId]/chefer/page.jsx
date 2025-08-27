"use client"; // Viktigt! Gör detta till en client component

import React, { useEffect, useState } from "react";
import { getUnitByID } from "@/backend/api";
import ActionsHandler from "@/components/actions/actionsHandler";
import PersonList from "@/components/personList";
import LoadingPage from "@/app/loading";

function ChefPage({ params }) {
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
        }
        setUnit(data);
      } catch (err) {
        setError("Fel vid hämtning av data");
      } finally {
        setLoading(false);
      }
    }
    fetchUnit();
  }, [unitId]);

  if (loading) return <LoadingPage message="Laddar användardetaljer..." />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!unit || !unit.users) {
    return (
      <p className="text-red-500">Kunde inte hämta enhet eller användare</p>
    );
  }

  const filterUser = unit.users.filter((user) =>
    user.role.includes("Enhetschef")
  );

  if (filterUser.length === 0) {
    return <p className="text-red-600">Det finns ingen chef för denna enhet</p>;
  }

  const chef = filterUser[0];
  // console.log("Founded CHEF ", chef);

  return (
    <PersonList
      name={chef.name}
      phone={chef.phone || "Ingen telefon"}
      email={chef.email || "Ingen e-post"}
      role={chef.role}>
      <ActionsHandler unitId={unitId} chef={chef} />
    </PersonList>
  );
}

export default ChefPage;
