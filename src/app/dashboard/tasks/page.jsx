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
function TaskPage() {
  const { currentUser } = useFetchCurrentUser();
  const { tasks, loading } = useFetchTask();
  const [searchValue, setSearchValue] = useState("");

  if (loading) {
    return <LoadingPage message="Laddar uppgifer ...." />;
  }

  return (
    <div className="flex flex-col">
      <h4 className="text-2xl font-bold mb-3 text-purple-500">Att göra</h4>
      <Link
        className="flex justify-center gap-x-5 items-center bg-green-200 px-4 py-2 text-black w-1/3 text-center p-2 rounded-xl shadow shadow-green-200 hover:bg-green-300 transition duration-200 mb-6"
        href={`/dashboard/tasks/create`}>
        Lägg till nytt uppdrag
      </Link>

      <TaskSearch />

      {tasks && tasks.length === 0 && (
        <div className="text-center text-red-500 text-lg mt-10">
          Det finns inga uppgifter att visa...
        </div>
      )}

      {/* Lista med uppgifter */}
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task) => (
          <ItemList
            key={task._id}
            task={task}
            title={task.title}
            description={task.description}
            updatedAt={task.updatedAt}
            createdAt={task.createdAt}
            status={task.status}>
            {currentUser && <TaskActions task={task} />}
          </ItemList>
        ))}
    </div>
  );
}

export default TaskPage;
