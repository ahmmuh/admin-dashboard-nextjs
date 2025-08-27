import React from "react";

function TaskModal({
  title,
  description,
  status,
  assignmentUnit,
  createdAt,
  updatedAt,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-auto relative"
        onClick={(e) => e.stopPropagation()}>
        {/* Stäng-knapp */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
          aria-label="Stäng modal">
          ×
        </button>

        {/* Modalinnehåll */}
        <div className="space-y-2">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {description && <p>{description}</p>}
          {assignmentUnit && (
            <p>
              <strong>Enhet:</strong> {assignmentUnit.name}
            </p>
          )}
          {status && (
            <p
              className={
                status === "Ej påbörjat"
                  ? "text-red-500"
                  : status === "Påbörjat"
                  ? "text-orange-500"
                  : "text-green-500"
              }>
              <strong>Status:</strong> {status}
            </p>
          )}

          {status === "Ej påbörjat" && createdAt && (
            <p>
              <strong>Skapad:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}

          {status === "Påbörjat" && updatedAt && (
            <p>
              <strong> Senast ändrad:</strong>{" "}
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}

          {status === "Färdigt" && updatedAt && (
            <p>
              <strong>Senast ändrad:</strong>{" "}
              {new Date(updatedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
