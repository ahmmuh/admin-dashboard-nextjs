"use client";
import { getUnitByID } from "@/backend/api";
import EditTaskClientComponent from "@/components/tasks/editTaskClientComponent";
import { useSearchParams } from "next/navigation";
import React from "react";

function TaskEditServerPage({ params }) {
  const { taskId, unitId } = React.use(params);
  // const unit = await getUnitByID(unitId);
  console.log("UNIT ID I TaskEditServerPage", unitId);
  const searchParams = useSearchParams();
  const task = {
    taskId: searchParams.get("taskId"),
    title: searchParams.get("title") || "Ingen titel",
    description: searchParams.get("description") || "ingen beskrivning",
    status:
      searchParams.get("status") && searchParams.get("status") !== null
        ? searchParams.get("status")
        : "Ej påbörjat",
  };
  return <EditTaskClientComponent unitId={unitId} task={task} />;
}

export default TaskEditServerPage;
