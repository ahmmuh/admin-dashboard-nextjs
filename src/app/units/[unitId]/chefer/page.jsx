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
      name={unit.chef ? unit.chef.name : "EJ chef"}
      phone={unit.chef ? unit.chef.phone : "Ingen telefon"}
      email={unit.chef ? unit.chef.email : "Ingen e-post"}>
      <ActionsHandler unitId={unitId} chef={unit.chef} />
    </PersonList>
  );
}

export default ChefPage;
