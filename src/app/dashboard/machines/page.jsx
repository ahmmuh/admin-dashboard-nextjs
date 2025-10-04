// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useFetchMachines } from "@/customhook/useFetchMachine";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGears } from "@fortawesome/free-solid-svg-icons";
// import LoadingPage from "@/app/loading";

// export default function MachinePage() {
//   const { machines, loading, error } = useFetchMachines();

//   if (loading) return <LoadingPage message="Hämtar maskiner..." />;
//   if (error)
//     return (
//       <p className="text-red-500">
//         Fel vid hämtning av maskiner: {error.message}
//       </p>
//     );

//   if (!machines || machines.length === 0)
//     return (
//       <p className="text-gray-500 flex items-center gap-2">
//         <FontAwesomeIcon icon={faGears} className="h-5 w-5" /> Inga maskiner att
//         visa just nu.
//       </p>
//     );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Maskiner</h1>
//         <Link
//           href="/dashboard/machines/create"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
//           + Skapa ny
//         </Link>
//       </div>

//       <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
//         <table className="w-full text-sm text-left border-collapse">
//           <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//             <tr>
//               <th className="px-4 py-3">Namn</th>
//               <th className="px-4 py-3">Enhet</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3 text-center">Åtgärder</th>
//             </tr>
//           </thead>
//           <tbody>
//             {machines.map((m, i) => (
//               <tr
//                 key={m._id}
//                 className={`${
//                   i % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-100 transition`}>
//                 <td className="px-4 py-3 font-medium">{m.name}</td>
//                 <td className="px-4 py-3">{m.unitId?.name || "-"}</td>
//                 <td className="px-4 py-3">
//                   {m.isAvailable ? (
//                     <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
//                       Tillgänglig
//                     </span>
//                   ) : (
//                     <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
//                       Utlånad
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 text-center">
//                   <div className="flex flex-wrap justify-center gap-2">
//                     <Link
//                       href={`/dashboard/machines/${m._id}`}
//                       className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
//                       Detaljer
//                     </Link>
//                     <Link
//                       href={`/dashboard/machines/${m._id}/edit`}
//                       className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
//                       Redigera
//                     </Link>
//                     <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
//                       Ta bort
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import Link from "next/link";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";

export default function MachinePage() {
  const { machines, loading, error, removeMachine } = useFetchMachines();

  const handleDelete = async (id) => {
    if (!confirm("Är du säker på att du vill ta bort denna maskin?")) return;

    try {
      await removeMachine(id);
      displaySuccessMessage("Maskin borttagen ✅");
    } catch (err) {
      console.error(err);
      displayErrorMessage("Kunde inte ta bort maskinen ❌");
    }
  };

  if (loading) return <LoadingPage message="Hämtar maskiner..." />;
  if (error)
    return (
      <p className="text-red-500">
        Fel vid hämtning av maskiner: {error.message}
      </p>
    );

  if (!machines || machines.length === 0)
    return (
      <p className="text-gray-500 flex items-center gap-2">
        <FontAwesomeIcon icon={faGears} className="h-5 w-5" /> Inga maskiner att
        visa just nu.
      </p>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Maskiner</h1>
        <Link
          href="/dashboard/machines/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          + Skapa ny
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Namn</th>
              <th className="px-4 py-3">Enhet</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m, i) => (
              <tr
                key={m._id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}>
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3">{m.unitId?.name || "-"}</td>
                <td className="px-4 py-3">
                  {m.isAvailable ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Tillgänglig
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                      Utlånad
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link
                      href={`/dashboard/machines/${m._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                      Detaljer
                    </Link>
                    <Link
                      href={`/dashboard/machines/${m._id}/edit`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                      Redigera
                    </Link>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                      Ta bort
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
