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
import { HiOutlineClipboardList, HiOutlineShoppingCart } from "react-icons/hi";
function TaskPage() {
  const { currentUser } = useFetchCurrentUser();
  const { tasks, loading } = useFetchTask();
  const [searchValue, setSearchValue] = useState("");

  if (loading) {
    return <LoadingPage message="Laddar uppgifer ...." />;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-purple-500 flex items-center gap-2">
          <HiOutlineClipboardList className="w-6 h-6" />
          Uppdrag för idag
        </h4>
        <p className="text-gray-500 text-md">
          Här visas alla aktuella uppdrag för enheten under dagen.
        </p>
      </div>

      <Link
        className="sm:w-1/2 flex justify-center gap-x-5 items-center bg-purple-500 text-white px-4 py-2 rounded-xl shadow shadow-purple-400 hover:bg-purple-600 transition duration-200 mb-6"
        href={`/dashboard/tasks/create`}>
        Lägg till nytt uppdrag
      </Link>

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
          tasks.map((task) => (
            <ItemList
              key={task._id}
              task={task}
              title={task.title}
              location={task.location}
              description={task.description}
              updatedAt={task.updatedAt}
              createdAt={task.createdAt}
              status={task.status}>
              {currentUser && <TaskActions task={task} />}
            </ItemList>
          ))}
      </div>
    </div>
  );
}

export default TaskPage;
