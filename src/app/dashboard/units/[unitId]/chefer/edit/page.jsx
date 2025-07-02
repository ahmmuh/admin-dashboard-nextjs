"use client";
import EditChefComponent from "@/components/editChefComponentt";
import { useSearchParams } from "next/navigation";
import React from "react";

function EditChefPage({ params }) {
  const { unitId } = React.use(params);
  const { chefId } = params;

  console.log("UNIT ID in Edit Chef Page", unitId);

  const searchParams = useSearchParams();
  //   const name = searchParams.get("name") || "Ingen chef";
  //   const phone = searchParams.get("phone") || "Ingen phone";
  //   const email = searchParams.get("email") || "Ingen email";

  const chef = {
    chefId: searchParams.get("chefId"),
    name: searchParams.get("name") || "Ingen chef",
    phone: searchParams.get("phone") || "Ingen telefon",
    email: searchParams.get("email") || "Ingen email",
  };

  return <EditChefComponent unitId={unitId} chef={chef} />;
}

export default EditChefPage;
