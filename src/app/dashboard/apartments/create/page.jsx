"use client";

import Loading from "@/app/loading";
import { getUnits } from "@/backend/api";
import CreateApartmentComponent from "@/components/apartments/createApartmentComponent";
import { useFetchUnits } from "@/customhook/useFetchUnits";
import React from "react";

function CreateApartmentPage() {
  const { units, loading, error } = useFetchUnits();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    <div className="flex justify-center items-center">
      <h4>{error.message}</h4>
    </div>;
  }
  // const units = await getUnits();

  return <CreateApartmentComponent units={units} />;
}

export default CreateApartmentPage;
