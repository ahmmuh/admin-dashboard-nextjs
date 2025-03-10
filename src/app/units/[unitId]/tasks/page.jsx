import { getUnitByID } from "@/backend/api";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import CustomLink from "@/components/link";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

async function TaskPage({ params }) {
  //const { unitId } = React.use(params); //React.use(params).unitId;
  const unit = await getUnitByID(params.unitId);

  console.log("Unit Name: in TaskPage ", unit);
  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Att göra på {unit.name}</h4>
      <>
        <CustomLink
          className=" bg-green-200 text-white w-20 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
          title={
            <FontAwesomeIcon icon={faPlus} className="text-2xl text-blue-500" />
          }
          icon={
            <FontAwesomeIcon icon={faHome} className="text-2xl text-blue-500" />
          }
          url={`/units/${unit._id}/tasks/create`}
        />
      </>

      {unit.tasks &&
        unit.tasks.map((task) => (
          <ItemList
            key={task._id}
            title={task.title}
            Uppdaterats={task.Uppdaterats}
            enhet={task.unit} //fixa sen
            description={task.description}
            completed={task.completed}>
            <TaskActions unitId={unit._id} task={task} />
          </ItemList>
        ))}
    </div>
  );
}

export default TaskPage;
