"use client";
import EditTaskComponent from "@/components/tasks/editTaskComponent";
import { useSearchParams } from "next/navigation";
import React from "react";

function TaskEditPage({ params }) {
  const { unitId } = params;
  const searchParams = useSearchParams();
  const task = {
    taskId: searchParams.get("taskId"),
    title: searchParams.get("title") || "Ingen titel",
    description: searchParams.get("description") || "ingen beskrivning",
    completed: searchParams.get("completed") || "No status is set",
  };
  return <EditTaskComponent unitId={unitId} task={task} />;
}

export default TaskEditPage;
