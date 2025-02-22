import React from "react";

function CreateChef() {
  return (
    <div className="flex flex-col justify-between gap-4 w-full">
      <h4 className="text-pink-400 text-2xl">Lägg till ny chef</h4>
      <div className="mb-4">
        <input
          type="text"
          className="p-2 bg-gray-200 rounded-2xl w-full  border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          className="p-2 bg-gray-200 rounded-2xl w-full border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
          placeholder="Telefon"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          className="p-2 bg-gray-200 rounded-2xl w-full border border-b-gray-50
                shadow shadow-blue-200 focus:bg-yellow-50"
          placeholder="E-post"
        />
      </div>
      <button
        className="bg-green-400  p-2 text-center  border border-b-gray-200 shado shadow-slate-400
          hover:bg-green-500 text-white">
        Spara
      </button>
    </div>
  );
}

export default CreateChef;
