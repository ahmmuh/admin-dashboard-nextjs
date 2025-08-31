import EditUnitClientPage from "@/components/units/editUnitClientPage";
import React from "react";

function EditUnitPage({ params }) {
  const { unitId } = params;
  return <EditUnitClientPage unitId={unitId} />;
}

export default EditUnitPage;
