import CreateTaskClientComponent from "@/components/tasks/createTaskComponent";
import React from "react";

function CreateTaskServerPage({ params }) {
  const { unitId } = params;
  return <CreateTaskClientComponent unitId={unitId} />;
}

export default CreateTaskServerPage;
