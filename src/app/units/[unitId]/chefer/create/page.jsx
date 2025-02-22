import CreateChef from "@/components/create-chef";
import React from "react";

function ChefCreatePage({ params }) {
  const { unitId } = params;
  console.log("UNITD i Chef Create Page ", unitId);
  return <CreateChef unitId={unitId} />;
}

export default ChefCreatePage;
