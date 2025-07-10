"use client";
import { getUnitByID } from "@/backend/api";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import CustomLink from "@/components/link";
import SearchInput from "@/components/searhInput";
import { useFetchTask } from "@/customhook/useFetchTaskAPI";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";

function TaskPage() {
  const { tasks } = useFetchTask();
  const [searchValue, setSearchValue] = useState("");

  // const searchHandler = (e) => {
  //   const { name, value } = e.target;
  //   console.log("Searching", name);
  // };

  return (
    <div className="flex flex-col  p-5">
      <>
        <h4 className="text-2xl font-bold mb-3 text-purple-500 ">Att göra </h4>
        <Link
          className=" flex justify-center gap-x-5 items-center bg-green-200  px-4 py-2 text-black w-1/3 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200 mb-6"
          href={`/dashboard/tasks/create`}>
          <FontAwesomeIcon icon={faPlus} className="text-2xl " />
          Lägg till
        </Link>
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
            status={task.status}>
            <TaskActions task={task} />
          </ItemList>
        ))}
    </div>
  );
}

export default TaskPage;
