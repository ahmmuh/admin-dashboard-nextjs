import { getUnitByID } from "@/backend/api";
import ActionsHandler from "@/components/actions/actionsHandler";
import ItemList from "@/components/itemList";
import React from "react";

async function TaskPage({ params }) {
  console.log("Tasks ", params.unitId);
  const unit = await getUnitByID(params.unitId);

  const date = new Date();

  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Att göra på {unit.name}</h4>
      {unit.tasks.map((task) => (
        <ItemList
          title={task.title}
          description={task.description}
          completed={task.completed}>
          <ActionsHandler id={task._id} />
        </ItemList>
      ))}
    </div>
  );
}

export default TaskPage;
