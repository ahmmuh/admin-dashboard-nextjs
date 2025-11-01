import { useState } from "react";

export default function CustomAlert({ message, onConfirm, onCancel }) {
  const [showDialog, setShowDialog] = useState(true);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setShowDialog(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setShowDialog(false);
  };

  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Är du säker?</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Avbryt
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
