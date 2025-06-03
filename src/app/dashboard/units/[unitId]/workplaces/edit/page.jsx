"use client";
import { EditWorkPlaceClientComponent } from "@/components/workplaces/editworkplaceClientComponent";
import { useSearchParams } from "next/navigation";
import React from "react";

const WorkPlaceEditServerPage = ({ params }) => {
  const { unitId, workPlaceId } = React.use(params);
  const searchParams = useSearchParams();

  const workPlace = {
    workPlaceId: searchParams.get("workPlaceId"),
    name: searchParams.get("name"),
    location: searchParams.get("location"),
  };
  return <EditWorkPlaceClientComponent unitId={unitId} workPlace={workPlace} />;
};

export default WorkPlaceEditServerPage;
