import { getApartments } from "@/backend/apartmentAPI";
import ApartmentList from "@/components/apartments/apartmentList";
import React from "react";

async function ApartmentPage() {
  const apartments = await getApartments();
  console.log("Apartments", apartments);
  return <ApartmentList apartments={apartments} />;
}

export default ApartmentPage;
