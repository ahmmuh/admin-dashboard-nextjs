import { getAllKeys } from "@/backend/keyAPI";
import Link from "next/link";
// import React, { useEffect, useState } from "react";

async function KeyPage() {
  const keys = await getAllKeys();
  console.log("Hämtade nycklar", keys);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-10 text-purple-500 italic">
        Nyckel hantering
      </h1>
      <div className="pr-10">
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
              <th className="border border-gray-200 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key._id} className="hover:bg-gray-300">
                <td className="border border-gray-200 p-2">
                  <Link href={`/keys/${key._id}/`}>{key.keyLabel}</Link>
                </td>
                <td className="border border-gray-200 p-2">{key.location}</td>
                <td className="border border-gray-200 p-2">
                  {key.status === "available" && (
                    <span className="text-green-700 font-bold">Inne</span>
                  )}

                  <span className="text-green-700 font-bold">
                    {key.status === "returned" && "Inlämnad"}
                  </span>

                  <span className="text-red-700 font-bold">
                    {key.status === "checked-out" && "Utlånad"}
                  </span>
                </td>
                <td className="border border-gray-200 p-2">
                  {key.status === "checked-out" ? key.borrowedBy.name : "—"}
                </td>

                <td className="border border-gray-200 p-2">
                  {key.status === "checked-out" && key.borrowedAt
                    ? new Date(key.borrowedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                <td className="border border-gray-200 p-2">
                  {key.status === "returned" && key.returnedAt
                    ? new Date(key.returnedAt).toLocaleString("sv-SE")
                    : "—"}
                </td>
                {key.status === "returned" && (
                  <td className="text-green-500 font-bold">Låna ut</td>
                )}
                {key.status === "available" && (
                  <td className="text-green-500 font-bold">Låna ut</td>
                )}
                {key.status === "checked-out" && (
                  <td className="text-red-500">Lämna in</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KeyPage;
