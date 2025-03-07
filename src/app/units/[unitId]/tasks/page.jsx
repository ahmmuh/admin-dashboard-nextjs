import { getUnitByID } from "@/backend/api";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import CustomLink from "@/components/link";
import React from "react";

async function TaskPage({ params }) {
  //const { unitId } = React.use(params); //React.use(params).unitId;
  const unit = await getUnitByID(params.unitId);

  console.log("Unit Name: in TaskPage ", unit);
  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Att göra på {unit.name}</h4>
      {!unit.tasks || unit.tasks.length === 0 ? (
        <>
          <p className="text-red-500 mb-4">Inga Tasks än</p>
          <CustomLink
            className="bg-green-400 text-white w-48 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-500 transition duration-200"
            title={"Ny Task"}
            url={`/units/${unitId}/tasks/create`}
          />
        </>
      ) : (
        unit.tasks.map((task) => (
          <ItemList
            key={task._id}
            title={task.title}
            description={task.description}
            completed={task.completed}>
            <TaskActions unitId={unit._id} task={task} />
          </ItemList>
        ))
      )}
    </div>
  );
}

export default TaskPage;
