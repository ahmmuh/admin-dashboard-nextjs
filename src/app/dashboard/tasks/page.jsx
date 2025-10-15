"use client";
import { useFetchTask } from "@/customhook/useFetchTaskAPI";
import TaskActions from "@/components/actions/taskActions";
import ItemList from "@/components/itemList";
import SearchInput from "@/components/searhInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import TaskSearch from "@/components/tasks/taskSearch";
import LoadingPage from "@/app/loading";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import {
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiPlus,
} from "react-icons/hi";
function TaskPage() {
  const { currentUser } = useFetchCurrentUser();
  const { tasks, fetchTasks, loading } = useFetchTask();
  const [searchValue, setSearchValue] = useState("");

  console.log("TASKS I TASK PAGE", tasks);

  if (loading) {
    return <LoadingPage message="Laddar uppgifer ...." />;
  }

  // console.log("ALLA MORGONJOBB: ", tasks);

  const isManager =
    currentUser?.role?.includes("Avdelningschef") ||
    currentUser?.role?.includes("Områdeschef");

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h3 className=" font-bold text-blue-500 flex items-center gap-2">
          <HiOutlineClipboardList className="w-6 h-6" />
          Alla morgonjobb för {new Date().toLocaleDateString("sv-SE")}
        </h3>
        <p className="text-gray-500 text-md px-6">
          Här visas alla aktuella uppdrag för samtliga enheter under dagen.
        </p>
      </div>

      <div className="my-6">
        <Link
          className="text-green-800  flex items-center gap-3"
          href={"/dashboard/tasks/create"}>
          <HiPlus />
          <span>Skapa morgonjobb</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <TaskSearch />
      </div>
      {tasks && tasks.length === 0 && (
        <div className="flex flex-col items-center text-center text-blue-500 text-lg mt-10">
          <HiOutlineClipboardList className="w-12 h-12 mb-2" />
          <p>Det finns inga uppgifter att visa...</p>
        </div>
      )}
      {/* Lista med uppgifter */}
      <div
        className={`${
          tasks.length > 2 ? "overflow-y-auto max-h-[500px]" : ""
        }`}>
        {tasks &&
          tasks.length > 0 &&
          tasks?.map((task) => (
            <ItemList
              key={task._id}
              task={task}
              title={task.title}
              address={task.address}
              description={task.description}
              updatedAt={task.updatedAt}
              createdAt={task.createdAt}
              status={task.status}>
              {<TaskActions task={task} fetchTasks={fetchTasks} />}
            </ItemList>
          ))}
      </div>
    </div>
  );
}

export default TaskPage;
