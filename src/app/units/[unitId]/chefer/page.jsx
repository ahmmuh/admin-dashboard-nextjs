import { getUnitByID } from "@/backend/api";
import React from "react";
import PersonList from "@/components/personList";
import ActionsHandler from "../../../../components/actions/actionsHandler";

async function ChefPage({ params }) {
  console.log("Chef ", params.unitId);
  const { unitId } = params;

  const unit = await getUnitByID(params.unitId);
  console.log("Chef info", unit.chef);

  return (
    <PersonList
      name={unit.chef.name === undefined ? "EJ chef" : unit.chef.name}
      phone={unit.chef.phone}
      email={unit.chef.email}>
      <ActionsHandler unitId={unitId} chef={unit.chef} />
    </PersonList>
  );
}

export default ChefPage;
