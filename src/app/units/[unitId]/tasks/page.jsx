import { getUnitByID } from "@/backend/api";
import React from "react";

async function TaskPage({ params }) {
  console.log("Tasks ", params.unitId);
  const unit = await getUnitByID(params.unitId);

  const date = new Date();

  return (
    <div className="flex flex-col text-blue-600 p-5">
      <h4 className="text-3xl font-bold mb-5">Att göra på {unit.name}</h4>
      <ul className="flex flex-col gap-4">
        {unit.tasks.map((task) => (
          <li
            key={task._id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h5 className="text-xl font-semibold text-gray-800">
              {task.title}
            </h5>
            <p className="text-gray-600">{task.description}</p>
            <p
              className={`${
                task.completed === "Färdigt" ? "text-green-600" : "text-red-900"
              } font-semibold mt-2`}>
              {task.completed}{" "}
              {task.completed === "Påbörjat" || task.completed === "Färdigt"}
              <span className="text-xs text-gray-500">
                Senast uppdaterad:{" "}
                {new Date(task.Uppdaterats).toLocaleDateString("sv-SE")}?{" "}
                {new Date(task.Uppdaterats).toLocaleDateString("sv-SE")}:
                Skapades: {task.Skapats}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
