import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { searchTasks } from "@/backend/taskApi";
import TaskModal from "../modals/taskModal";

function TaskSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // 👈 modaldata
  const [isModalOpen, setIsModalOpen] = useState(false); // 👈 modalsynlighet

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchTasks(query);
        console.log("SÖKTA UPPGIFTER", data);
        setResults(Array.isArray(data) ? data : data.data || []);
        setError(null);
      } catch (err) {
        setResults([]);
        setError(err.message);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Sök uppdrag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-blue-500 pl-10 pr-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <ul
        className={`mt-4 ${
          results?.length > 0 ? "overflow-y-scroll h-44" : ""
        }`}>
        {Array.isArray(results) &&
          results?.map((task) => (
            <li
              key={task._id}
              className="border-b border-purple-600 pb-3 cursor-pointer hover:bg-gray-100 px-2"
              onClick={() => handleTaskClick(task)}>
              🔍 <strong className="text-blue-600">{task.title}</strong>
            </li>
          ))}
      </ul>

      {/* Felmeddelande */}
      {results.length === 0 && query.trim() && (
        <p className="text-red-500 mt-3">Ingen uppgift matchar sökningen.</p>
      )}

      {/* Modal */}
      {isModalOpen && selectedTask && (
        <TaskModal
          title={selectedTask.title}
          location={selectedTask.location}
          description={selectedTask.description}
          status={selectedTask.status}
          assignmentUnit={selectedTask.assignmentUnit}
          createdAt={new Date(selectedTask.createdAt).toLocaleString("sv-SE")}
          updatedAt={new Date(selectedTask.updatedAt).toLocaleString("sv-SE")}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default TaskSearch;
