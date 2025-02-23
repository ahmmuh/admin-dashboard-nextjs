import CreateChefComponent from "@/components/createChefComponent";
import CreateSpecialistComponent from "@/components/specialister/createSpecialistComponent";
import React from "react";

function SpecialistCreatePage({ params }) {
  const { unitId } = params;
  console.log("UNITD i Specialist Create Page ", unitId);
  return <CreateSpecialistComponent unitId={unitId} />;
}

export default SpecialistCreatePage;
