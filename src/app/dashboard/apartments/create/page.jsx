import { getUnits } from "@/backend/api";
import CreateApartmentComponent from "@/components/apartments/createApartmentComponent";
import React from "react";

async function CreateApartmentPage() {
  const units = await getUnits();

  return <CreateApartmentComponent units={units} />;
}

export default CreateApartmentPage;
