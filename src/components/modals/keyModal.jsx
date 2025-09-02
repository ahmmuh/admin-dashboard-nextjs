import React from "react";

function KeyModal({
  keyLabel,
  //   keyType,
  location,
  createdAt,
  updatedAt,
  onClose,
  status,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start overflow-y-auto"
      onClick={onClose}>
      <div
        className="bg-white p-6 mt-20 rounded-lg shadow-lg max-w-md w-full h-auto max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
          aria-label="Stäng modal">
          ×
        </button>

        <div className="space-y-2">
          {keyLabel && <h2 className="text-xl font-semibold">🔑 {keyLabel}</h2>}

          {status === "returned" && (
            <p className="text-green-500">
              <strong>Status:</strong> Återlämnad
            </p>
          )}

          {status === "checked-out" && (
            <p className="text-red-500">
              <strong>Status:</strong> Utlånad
            </p>
          )}
          {status === "available" && (
            <p className="text-green-500">
              <strong>Status:</strong> Inne
            </p>
          )}
          {location && (
            <p>
              <strong>Plats:</strong> {location}
            </p>
          )}

          {(status === "checked-out" || status === "returned") && (
            <p>
              <strong>Senast ändrad:</strong>{" "}
              {new Date(updatedAt).toLocaleDateString("sv-SE")}
            </p>
          )}

          {status === "available" && (
            <p>
              <strong>Skapad:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default KeyModal;
