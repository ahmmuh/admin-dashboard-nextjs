import React from "react";
import { HiOutlineExclamation } from "react-icons/hi";

function UnitActionModal({
  message,
  cancelUnitDeleteModal,
  confirmUnitDelete,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center text-red-600">
          <HiOutlineExclamation className="w-8 h-8 mr-2" />
          <h2 className="text-xl font-bold">Varning!</h2>
        </div>
        <p className="mt-4 text-gray-700">{message}</p>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={cancelUnitDeleteModal}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
            Avbryt
          </button>
          <button
            onClick={confirmUnitDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Ja, ta bort
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnitActionModal;
