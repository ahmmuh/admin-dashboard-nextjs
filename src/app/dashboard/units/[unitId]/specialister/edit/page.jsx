"use client";
import EditChefComponent from "@/components/editChefComponentt";
import EditSpecialistComponent from "@/components/specialister/editSpecialistComponent";
import { useSearchParams } from "next/navigation";
import React from "react";

function EditSpecialistPage({ params }) {
  console.log("DEBUG - params: i EditSpecialistPage ", params); // Kolla om params innehåller unitId och specialistId

  const { unitId, specialistId } = React.use(params);
  console.log("DEBUG - unitId från params:", unitId);
  console.log("DEBUG - specialistId från params:", specialistId);

  const searchParams = useSearchParams();
  //   const name = searchParams.get("name") || "Ingen chef";
  //   const phone = searchParams.get("phone") || "Ingen phone";
  //   const email = searchParams.get("email") || "Ingen email";

  const specialist = {
    specialistId: searchParams.get("specialistId"),
    name: searchParams.get("name") || "Ingen Specialist",
    phone: searchParams.get("phone") || "Ingen telefon",
    email: searchParams.get("email") || "Ingen email",
  };

  return <EditSpecialistComponent unitId={unitId} specialist={specialist} />;
}

export default EditSpecialistPage;
