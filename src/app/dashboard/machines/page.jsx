// // "use client";

// // import React, { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useFetchMachines } from "@/customhook/useFetchMachine";
// // import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCalendar, faGears } from "@fortawesome/free-solid-svg-icons";
// // import LoadingPage from "@/app/loading";
// // import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// // import { HiPlus } from "react-icons/hi";

// // export default function MachinePage() {
// //   const router = useRouter();
// //   const { machines, loading, error, removeMachine, borrow, returnBack } =
// //     useFetchMachines();
// //   const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

// //   const [searchType, setSearchType] = useState("");
// //   const [selectedUnit, setSelectedUnit] = useState("");

// //   if (loading || currentUserLoading)
// //     return <LoadingPage message="Hämtar maskiner..." />;

// //   if (error)
// //     return (
// //       <p className="text-red-500">
// //         Fel vid hämtning av maskiner: {error.message}
// //       </p>
// //     );

// //   const roles = currentUser.role;

// //   // Unika enheter (för dropdown)
// //   const uniqueUnits = Array.from(
// //     new Set(machines.map((m) => m.unitId?.name).filter(Boolean))
// //   );

// //   // Filtrering baserat på maskintyp och enhet
// //   const filteredMachines = machines.filter((m) => {
// //     const matchType = m.name
// //       ?.toLowerCase()
// //       .includes(searchType.toLowerCase().trim());
// //     const matchUnit = selectedUnit ? m.unitId?.name === selectedUnit : true;
// //     return matchType && matchUnit;
// //   });

// //   const canManage = (machine, borrower) => {
// //     if (roles.includes("Avdelningschef") || roles.includes("Områdeschef"))
// //       return true;
// //     if (roles.includes("Enhetschef")) {
// //       const isMachineOnOwnUnit = machine.unitId?._id === currentUser.unit?._id;
// //       const isBorrowerOnOwnUnit = borrower?.unit?._id === currentUser.unit?._id;
// //       return isMachineOnOwnUnit && isBorrowerOnOwnUnit;
// //     }
// //     return borrower?._id === currentUser._id;
// //   };

// //   const showReturnButton = (machine, borrower) => {
// //     if (roles.includes("Avdelningschef") || roles.includes("Områdeschef"))
// //       return true;
// //     if (roles.includes("Enhetschef")) {
// //       const isMachineOnOwnUnit = machine.unitId?._id === currentUser.unit?._id;
// //       const isBorrowerOnOwnUnit = borrower?.unit?._id === currentUser.unit?._id;
// //       return isMachineOnOwnUnit && isBorrowerOnOwnUnit;
// //     }
// //     return borrower?._id === currentUser._id;
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Är du säker på att du vill ta bort denna maskin?")) return;
// //     try {
// //       await removeMachine(id);
// //       displaySuccessMessage("Maskin borttagen ✅");
// //     } catch (err) {
// //       console.error(err);
// //       displayErrorMessage("Kunde inte ta bort maskinen ❌");
// //     }
// //   };

// //   const handleBorrow = async (machine) => {
// //     try {
// //       const result = await borrow(machine._id, currentUser._id);
// //       if (result?.machine) displaySuccessMessage("Maskin utlånad ✅");
// //     } catch (err) {
// //       console.error(err);
// //       displayErrorMessage("Kunde inte låna ut maskinen ❌");
// //     }
// //   };

// //   const handleReturn = async (machine) => {
// //     try {
// //       const result = await returnBack(machine._id);
// //       if (result?.machine) displaySuccessMessage("Maskin återlämnad ✅");
// //     } catch (err) {
// //       console.error(err);
// //       displayErrorMessage("Kunde inte lämna in maskinen");
// //     }
// //   };

// //   if (!machines || machines.length === 0)
// //     return (
// //       <div>
// //         <Link
// //           className="text-green-800 flex items-center gap-3 mb-3"
// //           href={"/dashboard/machines/create"}>
// //           <HiPlus />
// //           <span>Lägg till ny maskin</span>
// //         </Link>
// //         <p className="text-gray-500 flex items-center gap-2">
// //           <FontAwesomeIcon icon={faGears} className="h-5 w-5" /> Inga maskiner
// //           att visa just nu.
// //         </p>
// //       </div>
// //     );

// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl text-blue-500 mb-5">
// //           Maskiner på alla enheter
// //         </h1>

// //         <div className="flex justify-evenly gap-x-2 ">
// //           <Link
// //             href={"/dashboard/machineLogs"}
// //             className="text-gray-600 flex items-center gap-1">
// //             <FontAwesomeIcon icon={faCalendar} /> Maskin historik
// //           </Link>
// //           <Link
// //             href="/dashboard/machines/create"
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
// //             + Skapa ny
// //           </Link>
// //         </div>
// //       </div>

// //       {/* 🔍 Filtreringsfält */}
// //       <div className="flex flex-col sm:flex-row gap-4 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Sök maskintyp..."
// //           value={searchType}
// //           onChange={(e) => setSearchType(e.target.value)}
// //           className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400"
// //         />
// //         <select
// //           value={selectedUnit}
// //           onChange={(e) => setSelectedUnit(e.target.value)}
// //           className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400">
// //           <option value="">Alla enheter</option>
// //           {uniqueUnits.map((unit) => (
// //             <option key={unit} value={unit}>
// //               {unit}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* 🧾 Maskintabell */}
// //       {filteredMachines.length === 0 ? (
// //         <p className="text-red-500 text-center text-lg font-semibold mt-10">
// //           Denna maskin finns inte.
// //         </p>
// //       ) : (
// //         <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
// //           <table className="w-full text-sm text-left border-collapse">
// //             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
// //               <tr>
// //                 <th className="px-4 py-3">Maskintyp</th>
// //                 <th className="px-4 py-3">Enhet</th>
// //                 <th className="px-4 py-3">Status</th>
// //                 <th className="px-4 py-3">Lånad av</th>
// //                 <th className="px-4 py-3">Utlånad datum</th>
// //                 <th className="px-4 py-3">Inlämnad datum</th>
// //                 <th className="px-4 py-3 text-center">Åtgärder</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {filteredMachines.map((m, i) => (
// //                 <tr
// //                   key={m._id}
// //                   onClick={() => router.push(`/dashboard/machines/${m._id}`)}
// //                   className={`${
// //                     i % 2 === 0 ? "bg-gray-100" : "bg-white"
// //                   } hover:bg-blue-50 hover:shadow-md transition cursor-pointer`}>
// //                   <td className="px-4 py-3 font-medium">{m.name}</td>
// //                   <td className="px-4 py-3">{m.unitId?.name || "-"}</td>
// //                   <td className="px-4 py-3">
// //                     {m.isAvailable ? (
// //                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
// //                         Tillgänglig
// //                       </span>
// //                     ) : (
// //                       <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
// //                         Utlånad
// //                       </span>
// //                     )}
// //                   </td>
// //                   <td className="px-4 py-3">{m.borrowedBy?.name || "-"}</td>
// //                   <td className="px-4 py-3">
// //                     {m.borrowedDate
// //                       ? new Date(m.borrowedDate).toLocaleDateString("sv-SE")
// //                       : "-"}
// //                   </td>
// //                   <td className="px-4 py-3">
// //                     {m.returnedDate
// //                       ? new Date(m.returnedDate).toLocaleDateString("sv-SE")
// //                       : "-"}
// //                   </td>

// //                   {/* ÅTGÄRDER */}
// //                   <td className="px-4 py-3 text-center">
// //                     <div className="flex flex-wrap justify-center gap-2">
// //                       {(roles.includes("Avdelningschef") ||
// //                         roles.includes("Områdeschef") ||
// //                         (roles.includes("Enhetschef") &&
// //                           m.unitId?._id === currentUser.unit?._id)) && (
// //                         <Link
// //                           href={`/dashboard/machines/${m._id}/edit`}
// //                           onClick={(e) => e.stopPropagation()}
// //                           className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
// //                           Redigera
// //                         </Link>
// //                       )}

// //                       {(roles.includes("Avdelningschef") ||
// //                         roles.includes("Områdeschef")) && (
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleDelete(m._id);
// //                           }}
// //                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
// //                           Ta bort
// //                         </button>
// //                       )}

// //                       {canManage(m, m.borrowedBy) && m.isAvailable && (
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleBorrow(m);
// //                           }}
// //                           className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
// //                           Låna ut
// //                         </button>
// //                       )}

// //                       {canManage(m, m.borrowedBy) &&
// //                         !m.isAvailable &&
// //                         showReturnButton(m, m.borrowedBy) && (
// //                           <button
// //                             onClick={(e) => {
// //                               e.stopPropagation();
// //                               handleReturn(m);
// //                             }}
// //                             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs">
// //                             Lämna in
// //                           </button>
// //                         )}
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useFetchMachines } from "@/customhook/useFetchMachine";
// import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendar, faGears } from "@fortawesome/free-solid-svg-icons";
// import LoadingPage from "@/app/loading";
// import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
// import { HiPlus } from "react-icons/hi";

// export default function MachinePage() {
//   const router = useRouter();
//   const { machines, loading, error, removeMachine } = useFetchMachines();
//   const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

//   const [searchType, setSearchType] = useState("");
//   const [selectedUnit, setSelectedUnit] = useState("");

//   if (loading || currentUserLoading)
//     return <LoadingPage message="Hämtar maskiner..." />;

//   if (error)
//     return (
//       <p className="text-red-500">
//         Fel vid hämtning av maskiner: {error.message}
//       </p>
//     );

//   const roles = currentUser.role;

//   const uniqueUnits = Array.from(
//     new Set(machines.map((m) => m.unitId?.name).filter(Boolean))
//   );

//   const filteredMachines = machines.filter((m) => {
//     const matchType = m.name
//       ?.toLowerCase()
//       .includes(searchType.toLowerCase().trim());
//     const matchUnit = selectedUnit ? m.unitId?.name === selectedUnit : true;
//     return matchType && matchUnit;
//   });

//   const handleDelete = async (id) => {
//     if (!confirm("Är du säker på att du vill ta bort denna maskin?")) return;
//     try {
//       await removeMachine(id);
//       displaySuccessMessage("Maskin borttagen ✅");
//     } catch (err) {
//       console.error(err);
//       displayErrorMessage("Kunde inte ta bort maskinen ❌");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl text-blue-500 mb-5">
//           Maskiner på alla enheter
//         </h1>
//         <div className="flex justify-evenly gap-x-2">
//           <Link
//             href={"/dashboard/machineLogs"}
//             className="text-gray-600 flex items-center gap-1">
//             <FontAwesomeIcon icon={faCalendar} /> Maskin historik
//           </Link>
//           <Link
//             href="/dashboard/machines/create"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
//             + Skapa ny
//           </Link>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Sök maskintyp..."
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//           className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400"
//         />
//         <select
//           value={selectedUnit}
//           onChange={(e) => setSelectedUnit(e.target.value)}
//           className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400">
//           <option value="">Alla enheter</option>
//           {uniqueUnits.map((unit) => (
//             <option key={unit} value={unit}>
//               {unit}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredMachines.length === 0 ? (
//         <p className="text-red-500 text-center text-lg font-semibold mt-10">
//           Denna maskin finns inte.
//         </p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
//           <table className="w-full text-sm text-left border-collapse">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-3">Maskintyp</th>
//                 <th className="px-4 py-3">Enhet</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Lånad av</th>
//                 <th className="px-4 py-3">Utlånad datum</th>
//                 <th className="px-4 py-3">Inlämnad datum</th>
//                 <th className="px-4 py-3 text-center">Åtgärder</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredMachines.map((m, i) => (
//                 <tr
//                   key={m._id}
//                   onClick={() => router.push(`/dashboard/machines/${m._id}`)}
//                   className={`${
//                     i % 2 === 0 ? "bg-gray-100" : "bg-white"
//                   } hover:bg-blue-50 hover:shadow-md transition cursor-pointer`}>
//                   <td className="px-4 py-3 font-medium">{m.name}</td>
//                   <td className="px-4 py-3">{m.unitId?.name || "-"}</td>
//                   <td className="px-4 py-3">
//                     {m.isAvailable ? (
//                       <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
//                         Tillgänglig
//                       </span>
//                     ) : (
//                       <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
//                         Utlånad
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{m.borrowedBy?.name || "-"}</td>
//                   <td className="px-4 py-3">
//                     {m.borrowedDate
//                       ? new Date(m.borrowedDate).toLocaleDateString("sv-SE")
//                       : "-"}
//                   </td>
//                   <td className="px-4 py-3">
//                     {m.returnedDate
//                       ? new Date(m.returnedDate).toLocaleDateString("sv-SE")
//                       : "-"}
//                   </td>

//                   <td className="px-4 py-3 text-center">
//                     <div className="flex flex-wrap justify-center gap-2">
//                       {/* Redigera för Enhetschef, Avdelningschef, Områdeschef */}
//                       {(roles.includes("Avdelningschef") ||
//                         roles.includes("Områdeschef") ||
//                         (roles.includes("Enhetschef") &&
//                           m.unitId?._id === currentUser.unit?._id)) && (
//                         <Link
//                           href={`/dashboard/machines/${m._id}/edit`}
//                           onClick={(e) => e.stopPropagation()}
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
//                           Redigera
//                         </Link>
//                       )}

//                       {/* Ta bort endast för Avdelningschef & Områdeschef */}
//                       {(roles.includes("Avdelningschef") ||
//                         roles.includes("Områdeschef")) && (
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(m._id);
//                           }}
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
//                           Ta bort
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFetchMachines } from "@/customhook/useFetchMachine";
import { useFetchCurrentUser } from "@/customhook/useFechCurrentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faGears } from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "@/app/loading";
import { displayErrorMessage, displaySuccessMessage } from "@/helper/toastAPI";
import { HiPlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export default function MachinePage() {
  const router = useRouter();
  const { machines, loading, error, removeMachine } = useFetchMachines();
  const { currentUser, loading: currentUserLoading } = useFetchCurrentUser();

  const [searchType, setSearchType] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  if (loading || currentUserLoading)
    return <LoadingPage message="Hämtar maskiner..." />;

  if (error)
    return (
      <p className="text-red-500">
        Fel vid hämtning av maskiner: {error.message}
      </p>
    );

  const roles = currentUser.role;

  const uniqueUnits = Array.from(
    new Set(machines.map((m) => m.unitId?.name).filter(Boolean))
  );

  const filteredMachines = machines.filter((m) => {
    const matchType = m.name
      ?.toLowerCase()
      .includes(searchType.toLowerCase().trim());
    const matchUnit = selectedUnit ? m.unitId?.name === selectedUnit : true;
    return matchType && matchUnit;
  });

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-blue-500 mb-5">
          Maskiner på alla enheter
        </h1>
        <div className="flex justify-evenly gap-x-2">
          <Link
            href={"/dashboard/machineLogs"}
            className="text-gray-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faCalendar} /> Maskin historik
          </Link>
          <Link
            href="/dashboard/machines/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            + Skapa ny
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Sök maskintyp..."
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={selectedUnit}
          onChange={(e) => setSelectedUnit(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400">
          <option value="">Alla enheter</option>
          {uniqueUnits.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      {filteredMachines.length === 0 ? (
        <p className="text-red-500 text-center text-lg font-semibold mt-10">
          Denna maskin finns inte.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Maskintyp</th>
                <th className="px-4 py-3">Enhet</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Lånad av</th>
                <th className="px-4 py-3">Utlånad datum</th>
                <th className="px-4 py-3">Inlämnad datum</th>
                <th className="px-4 py-3 text-center">Åtgärder</th>
              </tr>
            </thead>

            <tbody>
              {filteredMachines.map((m, i) => (
                <tr
                  key={m._id}
                  onClick={() => router.push(`/dashboard/machines/${m._id}`)}
                  className={`${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-50 hover:shadow-md transition cursor-pointer`}>
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
                  <td className="px-4 py-3">{m.borrowedBy?.name || "-"}</td>
                  <td className="px-4 py-3">
                    {m.borrowedDate
                      ? new Date(m.borrowedDate).toLocaleDateString("sv-SE")
                      : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {m.returnedDate
                      ? new Date(m.returnedDate).toLocaleDateString("sv-SE")
                      : "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {/* Redigera knapp */}
                      {(roles.includes("Avdelningschef") ||
                        roles.includes("Områdeschef") ||
                        (roles.includes("Enhetschef") &&
                          m.unitId?._id === currentUser.unit?._id)) && (
                        <Link
                          href={`/dashboard/machines/${m._id}/edit`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                          title="Uppdatera">
                          <HiOutlinePencil className="text-gray-600 w-5 h-5" />
                        </Link>
                      )}

                      {/* Ta bort knapp */}
                      {(roles.includes("Avdelningschef") ||
                        roles.includes("Områdeschef")) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(m._id);
                          }}
                          className="p-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                          title="Ta bort">
                          <HiOutlineTrash className="text-gray-600 w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
