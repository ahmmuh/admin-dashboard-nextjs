import { getAllKeys } from "@/backend/keyAPI";
// import React, { useEffect, useState } from "react";

async function KeyPage() {
  const keys = await getAllKeys();
  console.log("Hämtade nycklar", keys);

  return (
    <div>
      <h1 className="text-2xl font-bold my-3 text-purple-500 italic">
        Nyckel hantering
      </h1>
      <div className="">
        <table className="border-collapse border border-gray-400 w-full ">
          <thead>
            <tr className="">
              <th className="border border-gray-200 text-left">
                Nyckelbeteckning
              </th>
              <th className="border border-gray-200 text-left">Plats</th>
              <th className="border border-gray-200 text-left">Status</th>
              <th className="border border-gray-200 text-left">Lånetagare</th>
              <th className="border border-gray-200 text-left">
                Utlånat datum
              </th>
              <th className="border border-gray-200 text-left">
                Inlämnat datum
              </th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key._id} className="hover:bg-gray-300">
                <td className="border border-gray-200 p-2">{key.keyLabel}</td>
                <td className="border border-gray-200 p-2">{key.location}</td>
                <td className="border border-gray-200 p-2">
                  {key.status === "available" && (
                    <span className="text-green-700 font-bold">Inne</span>
                  )}
                  {key.status === "checked-out" && "Utlånad"}
                  {key.status === "checked-in" && "Inlämnad"}
                </td>
                <td className="border border-gray-200 p-2">Ahmed</td>
                <td className="border border-gray-200 p-2">
                  {key.status === "checked-out" && key.borrowedAt
                    ? new Date(key.borrowedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                <td>
                  {key.status === "checked-in" && key.returnedAt
                    ? new Date(key.returnedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KeyPage;
