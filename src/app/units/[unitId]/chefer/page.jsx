import { getUnitByID } from "@/backend/api";
import React from "react";

async function ChefPage({ params }) {
  console.log("Chef ", params.unitId);

  const unit = await getUnitByID(params.unitId);
  console.log("Chef", unit.chef.name);

  return (
    <div>
      <ul className="flex flex-col">
        <li key={unit._id} className="mb-2">
          <h4 className="text-2xl text-purple-700">Namn: {unit.chef.name}</h4>
          <p>Telefon: {unit.chef.phone}</p>
          <p>E-post: {unit.chef.email}</p>
        </li>
      </ul>
    </div>
  );
}

export default ChefPage;
