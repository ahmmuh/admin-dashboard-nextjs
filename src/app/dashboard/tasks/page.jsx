"use client";
import { getUnitByID } from "@/backend/api";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import CustomLink from "@/components/link";
import SearchInput from "@/components/searhInput";
import { useFetchTask } from "@/customhook/useFetchTaskAPI";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function TaskPage() {
  const { tasks } = useFetchTask();
  const [searchValue, setSearchValue] = useState("");

  // const searchHandler = (e) => {
  //   const { name, value } = e.target;
  //   console.log("Searching", name);
  // };

  return (
    <div className="flex flex-col  p-5">
      <h4 className="text-3xl font-bold mb-5 text-purple-500">Att göra </h4>
      <>
        <CustomLink
          className=" bg-green-200 text-white w-20 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200"
          title={
            <FontAwesomeIcon icon={faPlus} className="text-2xl text-blue-500" />
          }
          icon={
            <FontAwesomeIcon icon={faHome} className="text-2xl text-blue-500" />
          }
          url={`/dashboard/tasks/create`}
        />
        <SearchInput
          type="text"
          onSearch={() => console.log("Söker key logs")}
          delay={400}
          placeholder="Sök...."
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
