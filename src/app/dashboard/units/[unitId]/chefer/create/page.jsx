import CreateChefComponent from "@/components/createChefComponent";
import React from "react";

function ChefCreatePage({ params }) {
  const { unitId } = params;
  // console.log("UNITD i Chef Create Page ", unitId);
  return <CreateChefComponent unitId={unitId} />;
}

export default ChefCreatePage;
