import { getUnitByID } from "@/backend/api";
import ActionsHandler from "@/components/actions/actionsHandler";
import PersonList from "@/components/personList";
import React from "react";

async function ChefPage({ params }) {
  console.log("Chef ", params.unitId);
  const { unitId } = params;

  const unit = await getUnitByID(params.unitId);

  // if (!unit.users[0]) {
  //   return <p>Det finns ingen chef</p>;
  // }
  const filterUser = unit.users.filter((user) => user.role === "Chef");

  console.log("Filtered user", filterUser);

  return (
    <PersonList
      name={filterUser[0].name}
      phone={filterUser[0].phone || "Ingen telefon"}
      email={filterUser[0].email || "Ingen e-post"}
      role={filterUser[0].role}>
      <ActionsHandler unitId={unitId} chef={filterUser[0]} />
    </PersonList>
  );
}

export default ChefPage;
