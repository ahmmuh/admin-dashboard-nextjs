"use client";
import EditTaskComponent from "@/components/tasks/editTaskComponent";
import { useSearchParams } from "next/navigation";
import React from "react";

function TaskEditPage({ params }) {
  const { unitId } = React.use(params).unitId;
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
  return <EditTaskComponent unitId={unitId} task={task} />;
}

export default TaskEditPage;
