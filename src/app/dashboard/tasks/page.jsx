"use client";
import { getUnitByID } from "@/backend/api";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import CustomLink from "@/components/link";
import { useFetchTask } from "@/customhook/useFetchTaskAPI";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function TaskPage() {
  const { tasks } = useFetchTask();

  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Att göra </h4>
      <>
        <CustomLink
          className=" bg-green-200 text-white w-20 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
          title={
            <FontAwesomeIcon icon={faPlus} className="text-2xl text-blue-500" />
          }
          icon={
            <FontAwesomeIcon icon={faHome} className="text-2xl text-blue-500" />
          }
          url={`/tasks/create`}
        />
      </>

      {tasks &&
        tasks.map((task, index) => (
          <ItemList
            task={task}
            key={`${task._id}-${index}`}
            title={task.title}
            // enhet={task.unit} //fixa sen
            description={task.description}
            updatedAt={task.updatedAt}
            createdAt={task.createdAt}
            completed={task.completed}>
            <TaskActions task={task} />
          </ItemList>
        ))}
    </div>
  );
}

export default TaskPage;
