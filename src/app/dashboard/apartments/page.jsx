import { getApartments } from "@/backend/apartmentAPI";
import ApartmentList from "@/components/apartments/apartmentList";
import React from "react";

async function ApartmentPage() {
  const apartments = await getApartments();
  console.log("Apartments i ApartmentPage", apartments);
  return <ApartmentList apartments={apartments} />;
}

export default ApartmentPage;
